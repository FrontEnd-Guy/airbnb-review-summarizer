import React from 'react';
import { useSelector } from 'react-redux';
import './HistoryList.scss';
import HistoryItem from '../HistoryItem/HistoryItem';

const HistoryList = ({ onItemSelect }) => {
  const history = useSelector((state) => state.summary.history);

  return (
    <section className="history">
      <h3 className="recent-summaries-header">Recent Summaries:</h3>
      <ul>
        {history.map((item, index) => {
          if (!item || !item.url) {
            return null;
          }
          return (
            <li key={index} onClick={() => onItemSelect(item)}>
              <HistoryItem item={item} />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default HistoryList;
