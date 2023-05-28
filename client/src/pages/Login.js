import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Login = (props) => {
  const [formState, setFormState] = useState({ username: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      username: '',
      password: '',
    });
  };

  return (
    <div className="card-container">
      <div className='card-wrapper'>
        <div className="card login-card">
          <h4 className='login-title'>Login</h4>
            {data ? (
              <p>
                Success! You may now head{" "}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
            <div className="card-body">
              <form onSubmit={handleFormSubmit}>
                <input
                  className="form-input control"
                  placeholder="Employee ID"
                  name="username"
                  type="text"
                  autoComplete='username'
                  value={formState.username}
                  onChange={handleChange}
                />
                <input
                  className="form-input control"
                  placeholder="******"
                  name="password"
                  type="password"
                  autoComplete='current-password'
                  value={formState.password}
                  onChange={handleChange}
                />
                <div className='resetContainer'>
                  <a className='reset-button' href="/resetpassword">Forgot Password?</a>
                </div>
                <button className="control" type="submit">
                  Login
                </button>
              </form>
              <hr/>
              <a className='signup-button control alt' href='/signup'>Create Account</a>
            </div>
            )}

            {error && <div>{error.message}</div>}
        </div>
        <div className="card welcome-card">
              <h4>Welcome!</h4>
              <p>Don't have an account?</p>
              <a href='/signup' className='signup-button'>Create Account</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
