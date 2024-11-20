import './App.css'

import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link> | 
        <Link to="/about">About</Link> |
        <Link to="/login">Login</Link>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
};

export default App;
