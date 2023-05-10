import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { RESET_PASSWORD } from '../utils/mutations';


const ResetPassword = () => {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [resetPassword, { error }] = useMutation(RESET_PASSWORD);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await resetPassword({
        variables: { username, firstName, lastName, newPassword },
      });
      setSuccess(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="reset-password-container">
      <a className='go-back' href='/login'>&#10132;</a>
      {success ? (
        <div className="confirmation">
          <div className='confirmation-icon'></div>
          Password reset successful. <a href="/login">Click here to log in.</a>
        </div>
      ) : (
        <form className="reset-password-form" onSubmit={handleSubmit}>
          <label className="reset-password-label">
            Employee ID:
            <input className="reset-password-input" type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" />
          </label>
          <label className="reset-password-label">
            First Name:
            <input className="reset-password-input" type="text" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} autoComplete="given-name" />
          </label>
          <label className="reset-password-label">
            Last Name:
            <input className="reset-password-input" type="text" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} autoComplete="family-name" />
          </label>
          <label className="reset-password-label">
            New Password:
            <input className="reset-password-input" type="password" name="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} autoComplete="new-password" />
          </label>
          {error && <div className="reset-password-error">{error.message}</div>}
          <button className="reset-password-button" type="submit">Reset Password</button>
        </form>
      )}
    </div>
  );
};
  
  export default ResetPassword;