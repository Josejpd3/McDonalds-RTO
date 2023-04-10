import React, { useState } from 'react';

import { format, parse } from 'date-fns';

import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_REQUEST } from '../../utils/mutations';
import { QUERY_REQUESTS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';


const RequestForm = () => {

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [characterCount, setCharacterCount] = useState(0);

  const [addRequest, { error }] = useMutation(ADD_REQUEST, {
    update(cache, { data: { addRequest } }) {
      try {
        const { requests } = cache.readQuery({ query: QUERY_REQUESTS });

        cache.writeQuery({
          query: QUERY_REQUESTS,
          data: { requests: [addRequest, ...requests] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, requests: [...me.requests, addRequest] } },
      });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const startDateObject = parse(startDate, 'yyyy-MM-dd', new Date());
      const formattedStartDate = format(startDateObject, 'MM/dd/yy');

      if (endDate.length === 0) {
        const endDateObject = parse(startDate, 'yyyy-MM-dd', new Date());
        const formattedEndDate = format(endDateObject, 'MM/dd/yy');
        const { data } = await addRequest({
          variables: {
            startDate: formattedStartDate,
            endDate: formattedEndDate,
            requestAuthor: Auth.getProfile().data.username,
          },
        });

      } else {
        const endDateObject = parse(endDate, 'yyyy-MM-dd', new Date());
        const formattedEndDate = format(endDateObject, 'MM/dd/yy');
        const { data } = await addRequest({
          variables: {
            startDate: formattedStartDate,
            endDate: formattedEndDate,
            requestAuthor: Auth.getProfile().data.username,
          },
        });
      }
  
      setStartDate('');
      setEndDate('')
    } catch (err) {
      console.error(err);
    }
  };


  const handleChange = (event) => {
    const { name, value } = event.target;
  
    if (name === 'startDate') {
      setStartDate(value);
    }
  
    if (name === 'endDate') {
      setEndDate(value);
    }
  };


  return (
    <main>
      <h3>RTO</h3>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? 'error' : ''
            }`}
          >
            Character Count: {characterCount}/280
          </p>
          <form
            className="requestForm"
            onSubmit={handleFormSubmit}
          >

          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your requests. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </main>
  );
};
