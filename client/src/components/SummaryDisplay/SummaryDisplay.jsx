import React from 'react';
import { useSelector } from 'react-redux';
import './SummaryDisplay.scss';
import { FaThumbsUp, FaThumbsDown, FaMapMarkerAlt, FaExternalLinkAlt } from 'react-icons/fa';

const SummaryDisplay = () => {
  const { totalReviews, summary, url, image, name, address } = useSelector(
    (state) => state.summary.currentSummary,
  );

  return (
    <section className="summary-container">
      <article className="listing-info">
        <div className="listing-image">
          <img src={image} alt={name} />
        </div>
        <div className="listing-details">
          <h2>{name}</h2>
          <p>
            <FaMapMarkerAlt className="icon" />
            {address}
          </p>
          <a href={url} target="_blank" rel="noopener noreferrer">
            <button className="view-listing-button">
              <FaExternalLinkAlt className="icon" /> View Original Listing
            </button>
          </a>
        </div>
      </article>
      <article className="review-summary">
        <h2>
          Summary of <span>{totalReviews}</span> Reviews
        </h2>
        <div className="reviews">
          <div className="pros">
            <h3>People Liked:</h3>
            <ul>
              {summary?.pros?.length ? (
                summary.pros.map((pro, index) => (
                  <li key={index}>
                    <FaThumbsUp className="icon" />
                    {pro}
                  </li>
                ))
              ) : (
                <li>No positive reviews mentioned.</li>
              )}
            </ul>
          </div>
          <div className="cons">
            <h3>People Didn’t Like:</h3>
            <ul className="cons">
              {summary?.cons?.length ? (
                summary.cons.map((con, index) => (
                  <li key={index}>
                    <FaThumbsDown className="icon" />
                    {con}
                  </li>
                ))
              ) : (
                <li>No negative reviews mentioned.</li>
              )}
            </ul>
          </div>
        </div>
      </article>
    </section>
  );
};

export default SummaryDisplay;
