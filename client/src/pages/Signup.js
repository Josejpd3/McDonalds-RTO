import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
    role: 'crew',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="card-container">
      <div className="card-wrapper">
        <div className="card signup-card">
          <h4 className="signup-title">Sign Up</h4>
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
            <div className="card-body">
              <form onSubmit={handleFormSubmit}>
                <div className='nameContainer'>
                  <input
                    className="form-input control firstName"
                    placeholder="First Name"
                    name="firstName"
                    type="text"
                    autoComplete='given-name'
                    value={formState.firstName}
                    onChange={handleChange}
                  />
                  <input
                    className="form-input control lastName"
                    placeholder="Last Name"
                    name="lastName"
                    type="text"
                    autoComplete='family-name'
                    value={formState.lastName}
                    onChange={handleChange}
                  />
                </div>
                <input
                  className="form-input control"
                  placeholder="Your username"
                  name="username"
                  type="text"
                  autoComplete='username'
                  value={formState.name}
                  onChange={handleChange}
                />

                <input
                  className="form-input control"
                  placeholder="******"
                  name="password"
                  type="password"
                  autoComplete='new-password'
                  value={formState.password}
                  onChange={handleChange}
                />
                <button
                  className="signup-button control"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Create Account
                </button>
              </form>
              <hr/>
              <p>Already Have An Account?</p>
              <a className='signup-button control alt' href='/login'>Login</a>
            </div>
            )}

            {error && (
              <div className="error-message">
                {error.message}
              </div>
            )}
        </div>
        <div className="card welcome-card">
              <h4>Welcome!</h4>
              <p>Already have an account?</p>
              <a href='/login' className='login-button'>Login</a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
