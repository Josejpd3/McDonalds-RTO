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
    <div className="main">
      <h3>
        {request.requestAuthor} <br />
        <span style={{ fontSize: '1rem' }}>
          had this request on {request.createdAt}
        </span>
      </h3>
      <div className="textContainer">
        <blockquote
          style={{
            fontSize: '1.5rem',
            fontStyle: 'italic',
            border: '2px dotted #1a1a1a',
            lineHeight: '1.5',
          }}
        >
          {request.startDate}
        </blockquote>
      </div>
    </div>
  );
};

export default SingleRequest;
