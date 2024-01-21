import React, { useState } from 'react';
import axios from 'axios';
import MarkdownViewer from './components/MarkdownViewer';
import useUrlValidator from './hooks/useUrlValidator';
import { SUMMARIZE_API_URL } from './utils/apiConstants';

import './App.scss';
import Header from './components/Header/Header';
import Title from './components/Title/Title';
import Loader from './components/Loader/Loader';
import Footer from './components/Footer/Footer';

function App() {
  const [url, setUrl] = useState('');
  const [reviewData, setReviewData] = useState({ summary: '', totalReviews: null });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { isUrlValid } = useUrlValidator(url);

  const handlePasteClick = async (e) => {
    e.preventDefault()
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSummarize = async (e) => {
    e.preventDefault();
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
      <Header/>
      <Title text="Summarize Airbnb Reviews" />

      <div class="container">
        <form class="form" onSubmit={handleSummarize}>
          <div class="input-container">
            <input 
              type="url" 
              placeholder="Paste listing URL…"             
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
              <button type="button" className="paste-button" onClick={handlePasteClick}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 3H8C6.89543 3 6 3.89543 6 5V19C6 20.1046 6.89543 21 8 21H16C17.1046 21 18 20.1046 18 19V5C18 3.89543 17.1046 3 16 3Z" stroke="#888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M12 1V5" stroke="#888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M10 9H14" stroke="#888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <button type="submit" className="send-button" onClick={handleSummarize} disabled={isLoading || !isUrlValid}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M12 5L19 12L12 19" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
          </div>
        </form>
      </div>

      {isLoading && <Loader/> }
      {error && <div className="error-message">{error}</div>}
      {reviewData.summary && (
        <div className="summary-container">
          <h3>What <span>{reviewData.totalReviews}</span> People Say:</h3>
          <MarkdownViewer markdownText={reviewData.summary} />
        </div>
      )}
      <Footer/>
    </div>
  );
}

export default App;