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
};

