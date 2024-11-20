import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const MainLayout: React.FC = () => {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link> | 
        <Link to="/about">About</Link> |
        <Link to="/auth/login">Login</Link>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
};

export default MainLayout;