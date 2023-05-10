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

};
