import React from 'react';
import { useQuery } from '@apollo/client';

import RequestList from '../components/RequestList';

import { QUERY_REQUESTS } from '../utils/queries';


const Home = () => {
  const { loading, data } = useQuery(QUERY_REQUESTS);
  const requests = data?.requests || [];


  return (
    <main>

    </main>
  );
};
