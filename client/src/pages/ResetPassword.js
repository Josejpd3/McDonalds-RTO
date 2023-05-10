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
        <form className="reset-password-form" onSubmit={handleSubmit}>
          <label className="reset-password-label">
            Employee ID:
            <input className="reset-password-input" type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" />
          </label>
        </form>
    </div>
  );
