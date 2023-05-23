import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_USERS, QUERY_ME } from '../utils/queries';

const Search = () => {
  const { userId } = useParams();

};
