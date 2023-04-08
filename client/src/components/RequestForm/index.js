import React, { useState } from 'react';

import { format, parse } from 'date-fns';

import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_REQUEST } from '../../utils/mutations';
import { QUERY_REQUESTS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';


const RequestForm = () => {

  const [startDate, setStartDate] = useState('');

