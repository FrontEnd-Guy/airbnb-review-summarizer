import React from 'react';
import './Title.scss';

const Title = ({ text, className }) => {
  return <h2 className={`title ${className}`}>{text}</h2>;
};

export default Title;
