import React from 'react';

import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_SINGLE_REQUEST } from '../utils/queries';

const SingleRequest = () => {
  // Use `useParams()` to retrieve value of the route parameter `:requestId`
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
    <div className="single-request-main">
      <a className='go-back' href='/'>&#10132;</a>
      <h3>
        {request.requestAuthor} <br />
        <span style={{ fontSize: '1rem' }}>
          made this request on {request.createdAt}
        </span>
      </h3>
      <div className="textContainer">
          {request.startDate}
      </div>
    </div>
  );
};

export default SingleRequest;
