import React from 'react';
import { useSelector } from 'react-redux';
import './SummaryDisplay.scss';

const SummaryDisplay = () => {
  const { totalReviews, summary, url, image, name } = useSelector(
    (state) => state.summary.currentSummary,
  );

  return (
    <section className="summary-container">
      <img src={image} alt={name} />
      <div>
        <h2>
          Summary of <span>{totalReviews}</span> Reviews for <span>{name}</span>
        </h2>
        <h3>People Like:</h3>
        <ul>
          {summary && summary.pros && summary.pros.map((pro, index) => <li key={index}>{pro}</li>)}
        </ul>
        <h3>People Don’t Like:</h3>
        <ul className="cons">
          {summary && summary.cons && summary.cons.map((con, index) => <li key={index}>{con}</li>)}
        </ul>
        <a href={url} target="_blank" rel="noopener noreferrer" className="listing-link">
          View Original Listing
        </a>
      </div>
    </section>
  );
};

export default SummaryDisplay;
