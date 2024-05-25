# Deep Summaries
**AI-Powered Airbnb Review Summarizer**

## About
Traveling is a big passion of mine, alongside coding. When looking for accommodations, I often rely on reviews, as they tend to reveal more than the listing descriptions. But sifting through all of them can be time-consuming, especially for listings with dozens or even hundreds of reviews. To make this process easier, I developed an app that summarizes the reviews for me.

[![Deep Summaries Screenshot](https://github.com/FrontEnd-Guy/airbnb-review-summarizer/assets/105168167/81764e15-aeb9-46d0-851e-21f241d2d873)](http://deepsummaries.com)

## How it Works
The app extracts online reviews and feeds them into a model that can summarize these reviews, saving you the trouble of reading each one. If you've ever used ChatGPT, you've interacted with what's known as a Large Language Model (LLM). These Deep Learning models are trained to process, understand, and generate language. Think of LLMs as advanced autocomplete tools, capable of crafting not just a word or a sentence, but entire paragraphs or essays.

This capability is made possible as they are trained on vast datasets – hundreds of gigabytes of diverse texts like books, articles, and blogs, amounting to hundreds of billions of words. When responding to a prompt, an LLM predicts the next word by assigning probabilities to different `tokens` or words, selecting the most probable one. This selection is influenced by a parameter known as `temperature`, which dictates the predictability or randomness of the model's responses.

For this project I used `Gemini`, Google's generative AI model. Like other LLMs, Gemini leverages extensive data, including Google's unique datasets, making it particularly adept at understanding and summarizing diverse opinions in Airbnb reviews.


## Live Demo
Check out the live version at [DeepSummaries.com](http://deepsummaries.com)

## Technologies Used
- **Frontend:** Built with React and Redux Toolkit (RTK), maintains a user-friendly interface with a clean minimalistic design and utilizes local storage to keep track of the latest five summaries.
- **Backend:** Developed with Express and integrated with the Google Generative AI API, is deployed on a Google Cloud VM using Nginx and Docker for optimal performance and scalability.

## Future Scope
- **Token Length Adaptation:** To support listings with extensive reviews, future updates may include a splitting algorithm for making multiple requests, allowing the generation of multiple pro/con lists, followed by a final summarization step.
- **Scale Summarization Services:** Aiming to expand summarization capabilities beyond Airbnb, integrating other review-based services.
