import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_USER_ROLE } from '../../utils/mutations';

const RoleUpdateForm = ({ userId, currentRole }) => {
  const [selectedRole, setSelectedRole] = useState(currentRole);

};

