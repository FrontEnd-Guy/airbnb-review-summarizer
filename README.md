# Deep Summaries

**AI-Powered Airbnb Review Summarizer**

## About

Traveling is a big passion of mine, alongside coding. When looking for accommodations, I often rely on reviews, as they tend to reveal more than the listing descriptions. But sifting through all of them can be time-consuming, especially for listings with dozens or even hundreds of reviews. To make this process easier, I developed an app that summarizes the reviews for me.

[![Deep Summaries Screenshot - Web App](https://github.com/FrontEnd-Guy/airbnb-review-summarizer/assets/105168167/1c4ea872-e82a-4d6b-b0d5-bc88a6bb40a6)](http://deepsummaries.com)
[![Deep Summaries Screenshot - Chrome Extension](https://github.com/FrontEnd-Guy/airbnb-review-summarizer/assets/105168167/ea824d3e-cc36-4dc1-940e-655a01a3a675)](http://deepsummaries.com)

## How it Works

The app utilizes what's known as a Large Language Model (LLM). These deep learning models are adept at processing, understanding, and generating language. They're like advanced autocomplete tools that can craft not just a word or a sentence but entire paragraphs or essays. This capability comes from training on vast datasets - gigabytes of text from sources like books, articles, and blogs—amounting to hundreds of billions of words. An LLM predicts the next word by assigning probabilities to different word options, or `tokens`, and selects the most probable one. This selection is influenced by a parameter known as `temperature`, which dictates the predictability or randomness of the model's responses.

For this project I used `Gemini`, Google's generative AI model. Like other LLMs, Gemini leverages extensive data, including Google's unique datasets, making it particularly adept at understanding and summarizing diverse opinions in Airbnb reviews.

## Live Demo

Check out the live version at [DeepSummaries.com](http://deepsummaries.com)

## Technologies Used

- **Frontend:** Built with React and Redux Toolkit (RTK), maintains a user-friendly interface with a clean minimalistic design and utilizes local storage to keep track of the latest five summaries.
- **Backend:** Developed with Express and integrated with the Google Generative AI API, is deployed on a Google Cloud VM using Nginx and Docker for optimal performance and scalability.

## Future Scope

- ~~**Token Length Adaptation:** To support listings with extensive reviews, future updates may include a splitting algorithm for making multiple requests, allowing the generation of multiple pro/con lists, followed by a final summarization step.~~
  **Note:** Gemini now provides up to 2 million tokens of context, which is sufficient for extensive reviews without needing a splitting algorithm.
- **Chrome Extension Development:** Plan to create a Chrome extension for summarizing reviews directly on the current page.
- **Route Planning Feature:** Adding the ability to build routes for points of interest.
- **Scale Summarization Services:** Aiming to expand summarization capabilities beyond Airbnb, integrating other review-based services.
