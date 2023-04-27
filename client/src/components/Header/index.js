import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';



const Header = (props) => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="header">
      <div className="container">
        <nav className="navbar">
          <div className='header-title'>
              <h1>Welcome!</h1>
              <p>{props.role}</p>
          </div>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/about" className="nav-link btn btn-secondary about">Account</Link>
            </li>
            <button className="btn btn-lg btn-light m-2" onClick={logout}>
                Logout
            </button>
          </ul>
        </nav>
      </div>
    </header>
  );
};

