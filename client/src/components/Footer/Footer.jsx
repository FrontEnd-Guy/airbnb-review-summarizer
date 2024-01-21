import React from 'react';
import './Footer.scss';

const Footer = () => {
  return (
    <footer>
      <p>&copy; {new Date().getFullYear()} DeepSummaries </p>
    </footer>
  );
};

export default Footer;
