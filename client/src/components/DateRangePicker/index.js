import React, { useState, useEffect } from 'react';

import { useMutation } from '@apollo/client';

import { ADD_REQUEST } from '../../utils/mutations';
import { QUERY_REQUESTS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

function DateRangePicker({closeModal}) {
  
  const blockedDates = [
    { date: '2023-05-01', reason: 'Holiday' },
    { date: '2023-05-07', reason: 'Maintenance' },
    { date: '2023-04-28', reason: 'Event' },
  ];


  const [addRequest] = useMutation(ADD_REQUEST, {
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

  const [month, setMonth] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState({ startDate: null, endDate: null });
  const [mainDates, setMainDates]= useState({ startDate: '', endDate: ''})

  const isBlockedDate = date => {
    const today = new Date();
    const formattedDate = date.toISOString().slice(0, 10);
    const twoWeeksFromNow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 14);
  
    return (
      new Date(formattedDate) < today ||
      blockedDates.some(blockedDate => blockedDate.date === formattedDate) ||
      new Date(formattedDate) <= twoWeeksFromNow
    );
  };

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear().toString().slice(-2);
    return `${month}/${day}/${year}`;
  }

  const handleDateClick = (date) => {
    const { startDate: currentStartDate, endDate: currentEndDate } = selectedDates;

    if (!currentStartDate || (currentStartDate && currentEndDate)) {
      const startTimestamp = date.getTime();
      const formattedStartDate = formatTimestamp(startTimestamp);
      
      setSelectedDates({ startDate: date, endDate: null });
      setMainDates({ startDate: formattedStartDate, endDate: null });
    } else {
      const newEndDate = date > currentStartDate ? date : currentStartDate;
      const newStartDate = date < currentStartDate ? date : currentStartDate;
      // Get the formatted dates and log them
      const startTimestamp = newStartDate.getTime();
      const endTimestamp = newEndDate.getTime();
      const formattedStartDate = formatTimestamp(startTimestamp);
      const formattedEndDate = formatTimestamp(endTimestamp);
      setSelectedDates({ startDate: newStartDate, endDate: newEndDate });
      setMainDates({startDate: formattedStartDate, endDate: formattedEndDate})
    }
  };

  useEffect(() => {
  }, [mainDates]);

  const createRequest = async (event) => {
    event.preventDefault();
  
    try {
      if (mainDates.startDate && mainDates.endDate) {
        const { data } = await addRequest({
          variables: {
            startDate: mainDates.startDate,
            endDate: mainDates.endDate,
            requestAuthor: Auth.getProfile().data.username,
          },
        });
      } else if (mainDates.startDate && mainDates.endDate === '') {
        const { data } = await addRequest({
          variables: {
            startDate: mainDates.startDate,
            endDate: mainDates.startDate,
            requestAuthor: Auth.getProfile().data.username,
          },
        });
      }

      closeModal();
    } catch (err) {
      console.error(err);
    }
  }

  };

