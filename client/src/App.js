import React, { useState } from 'react';
import axios from 'axios';
import MarkdownViewer from './MarkdownViewer';
import './App.scss';

function App() {
  const [reviewData, setReviewData] = useState({ summary: '', totalReviews: null });
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSummarize = async () => {
    setIsLoading(true);
    setError('');
    setReviewData({ summary: '', totalReviews: null });

    try {
      const response = await axios.post('https://api.aibnbsummaries.com/summarize/', { url });
      setReviewData({ summary: response.data.summary, totalReviews: response.data.totalReviews });
    } catch (error) {
      setError(error.response.data.message || 'Error fetching summary.');
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
          onChange={e => setUrl(e.target.value)}
          placeholder="Paste listing URL here"
          className="url-input"
        />
        <button onClick={handleSummarize} disabled={isLoading} className="summarize-button">
          {isLoading ? 'Loading...' : 'Summarize'}
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
