import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import RequestList from '../components/RequestList';

import { QUERY_REQUESTS } from '../utils/queries';


const Home = () => {
  const { loading, data } = useQuery(QUERY_REQUESTS);
  const requests = data?.requests || [];


  return (
    <main>
      <div className="main">
        <div className="requestContainer">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <RequestList
              requests={requests}
              title="Request List"
            />
            
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
