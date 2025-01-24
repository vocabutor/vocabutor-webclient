import React from 'react';
import { Outlet, NavLink, Link } from 'react-router-dom';
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
                    <NavLink to="/" className={({ isActive, isPending }) =>
                        isPending ? "nav-link pending" : isActive ? "nav-link active" : "nav-link"
                    }>
                        Home
                    </NavLink>
                    <NavLink to="/decks" className={({ isActive, isPending }) =>
                        isPending ? "nav-link pending" : isActive ? "nav-link active" : "nav-link"
                    }>
                        My Decks
                    </NavLink>
                    <NavLink to="/profile" className={({ isActive, isPending }) =>
                        isPending ? "nav-link pending" : isActive ? "nav-link active" : "nav-link"
                    }>
                        Profile
                    </NavLink>
                </nav>
            </header>

            <div className='main-section-container'>
                <Outlet />
            </div>

            <footer className="footer">
                <Link className="footer-link" to="/about">About Us</Link>
                <Link className="footer-link" to="/support">Support</Link>
                <Link className="footer-link" to="/social">Social Links</Link>
            </footer>
        </div>
    );
};

export default MainLayout;