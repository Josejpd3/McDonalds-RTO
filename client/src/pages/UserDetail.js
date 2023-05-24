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
      <div className="userDetailComponent">
        <h2>User Detail</h2>
        <p>Username: {user.username}</p>
        <p>First Name: {user.firstName}</p>
        <p>Last Name: {user.lastName}</p>
        <p>Role: {user.role}</p>
        <h3>Requests</h3>
        {user.requests && user.requests.length > 0 ? (
          <ul>
            {user.requests.map((request) => (
              <li key={request._id}>
                <p>Start Date: {request.startDate}</p>
                <p>End Date: {request.endDate}</p>
                <p>Request Status: {request.requestStatus}</p>
                <p>Created At: {request.createdAt}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No requests made by this user.</p>
        )}
      </div>
    );
};

