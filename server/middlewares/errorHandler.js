import { ValidationError, ReviewParsingError, SummaryGenerationError, InternalServerError, NoReviewsError } from '../errors/customErrors.js';

const errorHandler = (err, req, res, next) => {
  if (err instanceof ValidationError || err instanceof ReviewParsingError || err instanceof SummaryGenerationError || err instanceof NoReviewsError) {
    res.status(err.statusCode).json({ error: err.message });
  } else {
    const internalError = new InternalServerError();
    res.status(internalError.statusCode).json({ error: internalError.message });
  }
};

export default errorHandler;
