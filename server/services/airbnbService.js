const axios = require('axios');
const { ReviewParsingError } = require('../errors/customErrors');

require('dotenv').config();

async function getListingData(listingId) {
  try {
    const response = await axios.get(`https://www.airbnb.com/api/v1/listings/${listingId}?key=${process.env.AIRBNB_API_KEY}&locale=en`);
    return response.data.listing;
  } catch (error) {
    throw new ReviewParsingError('Error occurred while parsing reviews.');
  }
}

async function fetchAllReviewComments(listingId) {
  try {
    const pageSize = 50;
    let page = 0;
    let reviewsCount;
    const comments = [];
    do {
      const offset = page * pageSize;
      const response = await axios.get(`https://www.airbnb.com/api/v2/homes_pdp_reviews?key=${process.env.AIRBNB_API_KEY}&locale=en&listing_id=${listingId}&limit=${pageSize}&offset=${offset}`);
      const pageComments = response.data.reviews.map(review => review.comments);
      comments.push(...pageComments);
      reviewsCount = response.data.metadata.reviews_count;
      page++;
    } while (page * pageSize < reviewsCount);
    return { comments, reviewsCount };
  } catch (error) {
    throw new ReviewParsingError('Error occurred while parsing reviews.');
  }
}

module.exports = {
  getListingData,
  fetchAllReviewComments
};