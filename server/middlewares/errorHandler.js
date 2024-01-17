const { ValidationError, ReviewParsingError, SummaryGenerationError, InternalServerError } = require('../errors/customErrors');

const errorHandler = (err, req, res, next) => {
    if (err instanceof ValidationError || err instanceof ReviewParsingError || err instanceof SummaryGenerationError) {
      res.status(err.statusCode).json({ error: err.message });
    } else {
      const internalError = new InternalServerError();
      res.status(internalError.statusCode).json({ error: internalError.message });
    }
};

module.exports = errorHandler;
