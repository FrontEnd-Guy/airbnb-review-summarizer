import React from 'react';
import './HistoryItem.scss';

const HistoryItem = ({ item }) => {
  return (
    <div className="history-item">
      <img src={item.image} alt={item.name} />
      <div className="history-item__info">
        <h3>{item.name}</h3>
        <p>{item.address}</p>
      </div>
    </div>
  );
};

export default HistoryItem;
