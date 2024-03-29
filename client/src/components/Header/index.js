import React from 'react';
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
          <button className="nav-link btn btn-secondary logout" onClick={logout}>
              Logout
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;