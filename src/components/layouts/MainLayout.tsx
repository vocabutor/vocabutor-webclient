import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './MainLayout.css'

const MainLayout: React.FC = () => {
  return (
    <div className="layout">
      {/* Header */}
      <header className="header">
        <Link to="/">
            <div className="logo">Vocabutor</div>
        </Link>
        <input
          type="text"
          className="search-bar"
          placeholder="Search decks or cards…"
        />
        <nav className="nav-menu">
          <Link to="/" className="nav-link active">
            Home
          </Link>
          <Link to="/decks" className="nav-link">
            My Decks
          </Link>
          <Link to="/profile" className="nav-link">
            Profile
          </Link>
        </nav>
      </header>

      <Outlet />

      <footer className="footer">
        <Link className="footer-link" to="/about">About Us</Link>
        <Link className="footer-link" to="/support">Support</Link>
        <Link className="footer-link" to="/social">Social Links</Link>
      </footer>
    </div>
  );
};

export default MainLayout;