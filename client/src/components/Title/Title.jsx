import React from 'react';
import './Title.scss';

const Title = ({ text, className }) => {
  return <h1 className={`title ${className}`}>{text}</h1>;
};

export default Title;
