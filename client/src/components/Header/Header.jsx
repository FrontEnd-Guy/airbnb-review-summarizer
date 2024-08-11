import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import './Header.scss';

const Header = () => {
  const location = useLocation();
  const navLinks = [
    { path: '/', name: 'Home' },
    { path: '/about', name: 'How It Works' },
  ];

  return (
    <header className="header">
      <div className="logo-container">
        <Logo className="logo" />
        <p>
          Deep
          <br />
          Summaries
        </p>
      </div>
      <nav>
        {navLinks.map((link) => {
          if (location.pathname !== link.path) {
            return (
              <Link key={link.name} to={link.path} className="link">
                {link.name}
              </Link>
            );
          }
          return null;
        })}
      </nav>
    </header>
  );
};

export default Header;
