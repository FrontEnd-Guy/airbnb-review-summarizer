const airbnbService = require('../services/airbnbService');
const generativeAIService = require('../services/generativeAIService');
const extractListingId = require('../utils/extractListingId');
const { ValidationError } = require('../errors/customErrors');

async function summarize(req, res, next) {
  try {
    const { url } = req.body;
    const listingId = extractListingId(url);
    if (!listingId) {
      throw new ValidationError('Invalid URL. Please provide a valid Airbnb listing link.');
    }
    const { xl_picture_url, name, address, lat, lng } = await airbnbService.getListingData(listingId);
    const { comments, reviewsCount } = await airbnbService.fetchAllReviewComments(listingId);
    const summary = await generativeAIService.summarizeReviews(comments);
    res.json({ summary, totalReviews: reviewsCount, image: xl_picture_url, name, address, lat, lng});
  } catch (error) {
    next(error);
  }
}

module.exports = {
  summarize,
};
