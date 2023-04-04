import React from 'react';

import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_SINGLE_REQUEST } from '../utils/queries';

const SingleRequest = () => {
  const { requestId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_REQUEST, {
    // pass URL parameter
    variables: { requestId: requestId },
  });

  const request = data?.request || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="main">

    </div>
  );
};

