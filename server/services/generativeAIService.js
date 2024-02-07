const { SummaryGenerationError } = require('../errors/customErrors');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { NoReviewsError } = require('../errors/customErrors');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function summarizeReviews(reviews) {
  if (reviews.length === 0) {
    throw new NoReviewsError('No reviews available to summarize.');
  }

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  let prompt = `
  Summarize the following reviews into two distinct lists titled 'Pros' and 'Cons'. 
  For 'Pros', list all the positive aspects mentioned in the reviews. 
  For 'Cons', list all the negative aspects mentioned in the reviews. 
  Format your response with 'Pros' and 'Cons' as headings and each point underneath as a bullet point. 
  Do not mix positive and negative points in the same bullet. 
  Start each point on a new line and make sure it is clearly categorized under the correct heading. 
  The reviews are as follows:
  `;

  reviews.forEach((review, index) => {
    prompt += `\nReview ${index + 1}: ${review}\n`;
  });

  prompt += `
  Based on these reviews, create a summary with the following format:

  Pros:
  - [Positive aspect 1]
  - [Positive aspect 2]

  Cons:
  - [Negative aspect 1]
  - [Negative aspect 2]

  Replace the placeholder text with actual points from the reviews. The points should be concise and directly extracted from the reviews where possible.
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

module.exports = {
  summarizeReviews
};

