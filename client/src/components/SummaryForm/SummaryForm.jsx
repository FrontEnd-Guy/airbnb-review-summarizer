import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSummary, setCurrentSummary } from '../../services/slices/summarySlice';
import HistoryList from '../HistoryList/HistoryList';
import useUrlValidator from '../../hooks/useUrlValidator';
import './SummaryForm.scss';

const SummaryForm = () => {
  const [url, setUrl] = useState('');
  const dispatch = useDispatch();
  const [isFocused, setIsFocused] = useState(false);
  const formRef = useRef(null);
  const { isLoading, history } = useSelector((state) => state.summary);
  const { isUrlValid } = useUrlValidator(url);

  useEffect(() => {
    function handleClickOutside(event) {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [formRef]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsFocused(false);
    if (isUrlValid) {
      dispatch(fetchSummary(url));
    }
  };

  const handlePasteClick = async (e) => {
    e.preventDefault();
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleHistoryItemClick = (clickedItem) => {
    setUrl(clickedItem.url);
    dispatch(setCurrentSummary(clickedItem));
    setIsFocused(false);
  };

  return (
    <form ref={formRef} className="form" onSubmit={handleSubmit}>
      <div className="input-container">
        <input
          type="text"
          placeholder="Paste listing URL…"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onFocus={() => setIsFocused(true)}
        />
        <button type="button" className="paste-button" onClick={handlePasteClick}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M16 3H8C6.89543 3 6 3.89543 6 5V19C6 20.1046 6.89543 21 8 21H16C17.1046 21 18 20.1046 18 19V5C18 3.89543 17.1046 3 16 3Z"
              stroke="#888"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 1V5"
              stroke="#888"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 9H14"
              stroke="#888"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button type="submit" className="send-button" disabled={isLoading || !isUrlValid}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M5 12H19"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 5L19 12L12 19"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        {isFocused && history.length > 0 && <HistoryList onItemSelect={handleHistoryItemClick} />}
      </div>
    </form>
  );
};

export default SummaryForm;
