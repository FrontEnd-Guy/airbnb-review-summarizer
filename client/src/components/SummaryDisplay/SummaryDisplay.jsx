import React from 'react';
import { useSelector } from 'react-redux';
import './SummaryDisplay.scss';
import MarkdownViewer from '../MarkdownViewer/MarkdownViewer';

const SummaryDisplay = () => {
  const { totalReviews, summary, url } = useSelector((state) => state.summary.currentSummary);

  return (
    <section className="summary-container">
      <h3>
        What <span>{totalReviews}</span> People Say:
      </h3>
      <MarkdownViewer markdownText={summary} />
      <a href={url} target="_blank" rel="noopener noreferrer" className="listing-link">
        View Original Listing
      </a>
    </section>
  );
};

export default SummaryDisplay;
