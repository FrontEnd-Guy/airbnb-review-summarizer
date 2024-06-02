import { SummaryGenerationError, NoReviewsError } from '../errors/customErrors.js';
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function summarizeReviews(reviews) {
  if (reviews.length === 0) {
    throw new NoReviewsError('No reviews available to summarize.');
  }

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  let prompt = `
  Summarize the following reviews into two distinct lists titled 'Pros' and 'Cons'. 
  For 'Pros', list all the positive aspects mentioned in the reviews. 
  For 'Cons', list all the negative aspects mentioned in the reviews.
  Format your response as a JSON object with keys 'pros' and 'cons'.
  Do not mix positive and negative points in the same bullet.
  Each point should be concise and directly extracted from the reviews where possible.
  Limit each list to a maximum of 10 bullet points.

  YOU MUST NOT USE MARKDOWN NOR LATEX!

  Here are the reviews:
`;

reviews.forEach((review, index) => {
  prompt += `\nReview ${index + 1}: ${review}\n`;
});

prompt += `
  Based on these reviews, create a summary with the following format:

  {
    "pros": [
      "Positive aspect 1",
      "Positive aspect 2"
    ],
    "cons": [
      "Negative aspect 1",
      "Negative aspect 2"
    ]
  }

  Replace the placeholder text with actual points from the reviews.
  Ensure the lists are concise and limited to the most important points.
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    return text;
  } catch (error) {
    throw new SummaryGenerationError('Error occurred during summary generation.');
  }
}

export default {
  summarizeReviews
};
