import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_USER_ROLE } from '../../utils/mutations';

const RoleUpdateForm = ({ userId, currentRole }) => {
  const [selectedRole, setSelectedRole] = useState(currentRole);
  const [updateUserRole, { loading, error }] = useMutation(UPDATE_USER_ROLE);

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateUserRole({
        variables: {
          userId,
          role: selectedRole,
        },
      });
      // Handle successful update, if needed
    } catch (error) {
      // Handle error, if needed
    }
  };

  return (
    <form onSubmit={handleSubmit}>

    </form>
  );
};

