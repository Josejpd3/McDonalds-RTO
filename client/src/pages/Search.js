import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_USERS, QUERY_ME } from '../utils/queries';

const Search = () => {
  const { userId } = useParams();

  // Query the list of users
  const { loading: usersLoading, data: usersData } = useQuery(QUERY_USERS, {
    variables: { userId },
  });

  // Query the current user
  const { loading: currentUserLoading, data: currentUserData } = useQuery(QUERY_ME);

  const users = usersData?.users || [];
  const currentUser = currentUserData?.me || {};

  if (usersLoading || currentUserLoading) {
    return <div>Loading...</div>;
  }

  // Check if the current user has an admin role
  if (currentUser.role !== 'admin') {
    return <div>Access denied. Only admins can view this page.</div>;
  }


  return (
    <div className="userListComponent">

    </div>
  );
};
