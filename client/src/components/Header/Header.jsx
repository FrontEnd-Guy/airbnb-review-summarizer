import React from 'react';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import './Header.scss';

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo-container">
        <Logo className="header__logo" />
        <p className="header__logo-caption">
          Deep
          <br />
          Summaries
        </p>
      </div>
    </header>
  );
};

export default Header;
