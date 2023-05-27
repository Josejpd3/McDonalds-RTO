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
      {error && <p>An error occurred. Please try again.</p>}
      <div>
        <h4>Current Role</h4>
        <h5>{currentRole}</h5>

      </div>
    </form>
  );
};

