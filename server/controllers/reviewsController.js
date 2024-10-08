import airbnbService from '../services/airbnbService.js';
import generativeAIService from '../services/generativeAIService.js';
import extractListingId from '../utils/extractListingId.js';
import { ValidationError } from '../errors/customErrors.js';

async function summarize(req, res, next) {
  try {
    const { url } = req.body;
    const listingId = extractListingId(url);
    if (!listingId) {
      throw new ValidationError('Invalid URL. Please provide a valid Airbnb listing link.');
    }
    const { xl_picture_url, name, address, lat, lng } = await airbnbService.getListingData(listingId);
    const { comments, reviewsCount } = await airbnbService.fetchAllReviewComments(listingId);
    const rawSummary = await generativeAIService.summarizeReviews(comments);
    let summary;
    try {
      summary = JSON.parse(rawSummary.replace(/^```json|```$/g, '').trim());
    } catch (parseError) {
      console.error('Error parsing summary JSON:', parseError);
      throw new Error('Failed to parse summary JSON');
    }
    res.json({ summary, totalReviews: reviewsCount, image: xl_picture_url, name, address, lat, lng });
  } catch (error) {
    next(error);
  }
}

export {
  summarize,
};
