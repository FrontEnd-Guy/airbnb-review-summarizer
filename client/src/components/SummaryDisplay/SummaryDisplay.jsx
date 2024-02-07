import React from 'react';
import { useSelector } from 'react-redux';
import './SummaryDisplay.scss';
import MarkdownViewer from '../MarkdownViewer/MarkdownViewer';

const SummaryDisplay = () => {
  const { totalReviews, summary, url, image, name } = useSelector(
    (state) => state.summary.currentSummary,
  );

  return (
    <section className="summary-container">
      <img src={image} alt={name} />
      <div>
        <h2>
          What <span>{totalReviews}</span> People Say About
          <br />
          <span>{name}</span>
        </h2>
        <MarkdownViewer markdownText={summary} />
        <a href={url} target="_blank" rel="noopener noreferrer" className="listing-link">
          View Original Listing
        </a>
      </div>
    </section>
  );
};

export default SummaryDisplay;
