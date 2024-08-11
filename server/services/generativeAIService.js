import { SummaryGenerationError, NoReviewsError } from '../errors/customErrors.js';
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function summarizeReviews(reviews) {
  if (reviews.length === 0) {
    throw new NoReviewsError('No reviews available to summarize.');
  }

  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash", 
    generationConfig: { 
      responseMimeType: "application/json", 
      responseSchema: {
        "type": "object",
        "properties": {
          "pros": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "cons": {
            "type": "array",
            "items": {
              "type": "string"
            }
          }
        },
        "required": ["pros", "cons"]
      }
    } 
  });

  let prompt = `
  Summarize the following reviews into two distinct lists titled 'Pros' and 'Cons'. 
  For 'Pros', list the positive aspects mentioned in the reviews. 
  For 'Cons', list the negative aspects mentioned in the reviews.
  Format your response as a JSON object with keys 'pros' and 'cons'.
  Each point should be concise and directly extracted from the reviews where possible.
  Limit each list to a maximum of 10 bullet points.
  Do not use Markdown or LaTeX.
  
  Here are the reviews:
  `;
  
  reviews.forEach((review, index) => {
    prompt += `\nReview ${index + 1}: ${review}\n`;
  });
  
  prompt += `
  Based on these reviews, create a JSON object with the following format:
  
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
