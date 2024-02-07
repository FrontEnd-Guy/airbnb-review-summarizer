import React from 'react';
import './Footer.scss';

const Footer = () => {
  return (
    <footer>
      <p>&copy; {new Date().getFullYear()} Pavel Zakharov | DeepSummaries </p>
    </footer>
  );
};

export default Footer;
