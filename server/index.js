const express = require('express');
const puppeteer = require('puppeteer');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001; 

const corsOptions = {
  origin: process.env.ALLOWED_DOMAINS.split(","),
};

app.use(cors(corsOptions));

const genAI = new GoogleGenerativeAI("AIzaSyDvtAHpbFjwaytqFl1MaFChnHwPNmCUIdg");

app.use(express.json());

app.post('/summarize', async (req, res) => {
  const { url } = req.body;

  try {
    let finalUrl = url;
    if (url.startsWith('https://abnb.me/')) {
      const expandedUrl = await getFinalUrl(url);
      finalUrl = expandedUrl.finalUrl;
    }

    const listingId = extractListingId(finalUrl);
    if (!listingId) {
      return res.status(400).send('Provided URL is not a valid Airbnb listing link.');
    }

    const { comments, reviewsCount } = await fetchAllReviewComments(listingId);
    const summary = await summarizeReviews(comments);
    res.json({ summary, totalReviews: reviewsCount});
  } catch (error) {
    res.status(500).send('An error occurred while processing the request.');
    console.log(error)
  }
});

async function getFinalUrl(shortUrl) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(shortUrl, { waitUntil: 'networkidle2' });
  const finalUrl = page.url();
  await browser.close();
  return { finalUrl };
}

function extractListingId(url) {
  const regex = /\/rooms\/(\d+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

async function fetchAllReviewComments(listingId) {
  const pageSize = 50;
  let page = 0;
  let reviewsCount;
  const comments = [];
  do {
    const offset = page * pageSize;
    const response = await axios.get(`https://www.airbnb.com/api/v2/homes_pdp_reviews?key=d306zoyjsyarp7ifhu67rjxn52tv0t20&locale=en&listing_id=${listingId}&limit=${pageSize}&offset=${offset}`);
    const pageComments = response.data.reviews.map(review => review.comments);
    comments.push(...pageComments);
    reviewsCount = response.data.metadata.reviews_count;
    page++;
  } while (page * pageSize < reviewsCount);
  return { comments, reviewsCount }; 
}

async function summarizeReviews(reviews) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  let prompt = "I've collected some reviews from an Airbnb I'm considering staying at. Please summarize the reviews in a structured format focusing on what guests generally like (Pros) and dislike (Cons). The reviews are below:\n";
  for (const review of reviews) {
    prompt += '\n' + review;
  }

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    return text;
  } catch (error) {
    console.error('Error during content generation:', error);
  }
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
