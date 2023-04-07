import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import RequestList from '../components/RequestList';

import { QUERY_REQUESTS, QUERY_USER, QUERY_ME, } from '../utils/queries';

import Auth from '../utils/auth';


const Home = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const { loadingAll, data: allData } = useQuery(QUERY_REQUESTS);
  const allRequests = allData?.requests || [];

  const user = data?.me || data?.user || {};


  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <div>
        <a href='/login'>Login</a>
        <a href='/signup'>Sign Up</a>
        <h4>
          You need to be logged in to see this. Use the navigation links above to
          sign up or log in!
        </h4>
      </div>

    );
  }

  if(user.role === 'manager') {
    return (
      <div>

      </div>
    )
        </div>
      </div>
    </main>
  );
};

export default Home;
