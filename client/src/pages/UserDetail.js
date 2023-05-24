import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';

const UserDetail = () => {
  const { userId } = useParams();
  const { loading, data } = useQuery(userId ? QUERY_USER : QUERY_ME, {
    variables: { userId },
  });

  const currentUserData = useQuery(QUERY_ME);
  const currentUser = currentUserData?.data?.me || {};
  const user = userId ? data?.user : currentUser;

  if (loading) {
    return <div>Loading...</div>;
  }

  // Check if the user has an admin role
  if (currentUser.role !== 'admin') {
    return <div>Access denied. Only admins can view this page.</div>;
  }

    return (
};

