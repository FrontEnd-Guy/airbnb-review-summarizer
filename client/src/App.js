import React, { useState } from 'react';
import axios from 'axios';
import MarkdownViewer from './components/MarkdownViewer';
import useUrlValidator from './hooks/useUrlValidator';
import { SUMMARIZE_API_URL } from './utils/apiConstants';

import './App.scss';

function App() {
  const [url, setUrl] = useState('');
  const [reviewData, setReviewData] = useState({ summary: '', totalReviews: null });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { isUrlValid } = useUrlValidator(url);

  const handleChange = (e) => {
    setUrl(e.target.value);
  };

  const handleSummarize = async () => {
    if (!isUrlValid) {
      setError('Please enter a valid URL.');
      return;
    }

    setIsLoading(true);
    setError('');
    setReviewData({ summary: '', totalReviews: null });

    try {
      const response = await axios.post(SUMMARIZE_API_URL, { url });
      setReviewData({ summary: response.data.summary, totalReviews: response.data.totalReviews });
    } catch (error) {
      setError(error.response?.data.error || 'Error fetching summary.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="header">
        <h1>Airbnb Review Summarizer</h1>
      </div>
      <div className="input-group">
      <input
          type="url"
          value={url}
          onChange={handleChange}
          placeholder="Paste listing URL here"
          className={`url-input ${!isUrlValid && url ? 'invalid' : ''}`}
        />
        <button onClick={handleSummarize} disabled={isLoading || !isUrlValid} className="summarize-button">
          {isLoading ? 'Loading...' : 'Summarize' }
        </button>
      </div>
      {error && <div className="error-message">{error}</div>}
      {reviewData.summary && (
        <div className="summary-container">
          <h2>What <span>{reviewData.totalReviews}</span> People Say:</h2>
          <MarkdownViewer markdownText={reviewData.summary} />
        </div>
      )}
      <footer>
        <p>&copy; {new Date().getFullYear()} DeepSummaries </p>
      </footer>
    </div>
  );
}

export default App;