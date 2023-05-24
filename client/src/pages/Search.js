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
      <h3>User List</h3>
      {users.length === 0 ? (
        <div>
          <h3>No Users</h3>
        </div>
      ) : (
        <div className="userContainer">
          {users.map((user) => (
            <div key={user._id} className="user">
              <Link to={`/users/${user._id}`}>
                <h4>{user.username}</h4>
              </Link>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};
