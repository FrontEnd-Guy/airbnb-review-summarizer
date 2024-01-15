import React, { useState } from 'react';
import axios from 'axios';
import MarkdownViewer from './MarkdownViewer';
import './App.scss';

function App() {
  const [summary, setSummary] = useState('');
  const [totalReviews, setTotalReviews] = useState(null);
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSummarize = async () => {
    setIsLoading(true);
    setTotalReviews(null);
    setSummary('');
    try {
      const response = await axios.post('https://api.aibnbsummaries.com/summarize/', { url });
      setSummary(response.data.summary);
      setTotalReviews(response.data.totalReviews);
    } catch (error) {
      console.error('Error fetching summary:', error);
      setSummary('Error fetching summary.');
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
      {summary && (
        <div className="summary-container">
          <h2>What <span>{totalReviews}</span> People Say:</h2>
          <MarkdownViewer markdownText={summary} />
        </div>
      )}
    </div>
  );
}

export default App;
