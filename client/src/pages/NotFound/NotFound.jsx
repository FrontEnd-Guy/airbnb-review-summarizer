import React from 'react';
import Title from '../../components/Title/Title';
import { Link } from 'react-router-dom';
import './NotFound.scss';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <Title text={'404: Page Not Found'} />
      <p className="not-found-text">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="home-link">
        Go back home
      </Link>
    </div>
  );
};

export default NotFound;
