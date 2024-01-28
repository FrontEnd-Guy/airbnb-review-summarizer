import React from 'react';
import { useSelector } from 'react-redux';
import './HistoryList.scss';

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
              <svg
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                width="512.000000pt"
                height="512.000000pt"
                viewBox="0 0 512.000000 512.000000"
                preserveAspectRatio="xMidYMid meet">
                <g
                  transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                  fill="#888"
                  stroke="none">
                  <path
                    d="M2535 4994 c-208 -17 -388 -52 -579 -115 -504 -165 -931 -499 -1212
-945 -29 -47 -55 -90 -57 -97 -3 -7 -131 114 -286 268 l-281 280 0 -793 0
-792 792 0 793 0 -342 343 -343 342 36 64 c112 201 279 400 462 550 455 371
1062 500 1638 347 327 -87 643 -285 883 -551 223 -248 383 -574 443 -903 28
-155 30 -449 5 -592 -81 -444 -285 -808 -616 -1097 -614 -537 -1513 -599
-2191 -150 -283 187 -506 444 -660 757 -26 54 -52 111 -58 129 l-11 31 -255 0
c-141 0 -256 -2 -256 -4 0 -18 59 -185 96 -274 273 -652 842 -1151 1531 -1342
327 -91 731 -106 1065 -39 626 125 1178 508 1518 1054 119 191 241 491 289
710 74 336 72 701 -6 1030 -155 659 -607 1232 -1213 1539 -230 117 -476 195
-720 230 -107 16 -375 27 -465 20z"
                  />
                  <path
                    d="M2315 3768 c-3 -7 -4 -287 -3 -623 l3 -609 565 -337 c311 -186 570
-338 575 -338 9 -1 187 280 192 304 2 5 -215 140 -482 300 l-485 290 0 512 0
513 -180 0 c-135 0 -182 -3 -185 -12z"
                  />{' '}
                </g>
              </svg>
              {item.url}
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default HistoryList;
