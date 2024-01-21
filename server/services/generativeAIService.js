const { SummaryGenerationError } = require('../errors/customErrors');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function summarizeReviews(reviews) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  let prompt = "I've collected some reviews from an Airbnb I'm considering staying at. Please summarize the reviews in a structured format focusing on what guests generally like (Pros) and dislike (Cons). The reviews are below:\n";
  let reviewNumber = 1;
  for (const review of reviews) {
    prompt += '\n' + reviewNumber + ". " + review;
    reviewNumber++;
  }

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
