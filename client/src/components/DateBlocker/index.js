import React, { useState } from 'react';

import { useMutation, useQuery } from '@apollo/client';

import { BLOCK_DATE, REMOVE_BLOCKED_DATE} from '../../utils/mutations';
import { QUERY_BLOCKED_DATES } from '../../utils/queries';

function DateBlocker() {
    const [date, setDate] = useState('');
    const { loading, error, data } = useQuery(QUERY_BLOCKED_DATES);
    const [blockDate] = useMutation(BLOCK_DATE, {
      update(cache, { data: { blockDate } }) {
        const { blockedDates } = cache.readQuery({ query: QUERY_BLOCKED_DATES });
        cache.writeQuery({
          query: QUERY_BLOCKED_DATES,
          data: { blockedDates: blockedDates.concat([blockDate]) }
        });
      }
    });

    const [removeBlockedDate] = useMutation(REMOVE_BLOCKED_DATE);

    const handleDelete = async (blockedDateId) => {
        try {
          await removeBlockedDate({ variables: { blockedDateId } });
          window.location.reload();
        } catch (error) {
          console.error(error);
        }
      };
  
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const dateObject = new Date(date);
          const timezoneOffset = dateObject.getTimezoneOffset() * 60 * 1000;
          const utcDate = dateObject.getTime() + timezoneOffset;
        } catch (err) {
          console.error(err);
        }
      };
