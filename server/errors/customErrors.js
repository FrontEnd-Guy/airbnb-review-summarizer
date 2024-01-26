class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
    this.statusCode = 400;
  }
}

class ReviewParsingError extends Error {
  constructor(message) {
    super(message);
    this.name = "ReviewParsingError";
    this.statusCode = 500;
  }
}

class SummaryGenerationError extends Error {
  constructor(message) {
    super(message);
    this.name = "SummaryGenerationError";
    this.statusCode = 500;
  }
}

class InternalServerError extends Error {
  constructor(message = 'Internal Server Error') {
    super(message);
    this.name = "InternalServerError";
    this.statusCode = 500;
  }
}

class NoReviewsError extends Error {
  constructor(message) {
    super(message);
    this.name = "NoReviewsError";
    this.statusCode = 400;
  }
}

module.exports = {
  ValidationError,
  ReviewParsingError,
  SummaryGenerationError,
  InternalServerError,
  NoReviewsError
};
