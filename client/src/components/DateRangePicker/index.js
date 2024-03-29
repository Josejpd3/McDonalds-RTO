import React, { useState, useEffect } from 'react';

import { useMutation, useQuery } from '@apollo/client';

import { ADD_REQUEST } from '../../utils/mutations';
import { QUERY_REQUESTS, QUERY_ME, QUERY_BLOCKED_DATES } from '../../utils/queries';

import Auth from '../../utils/auth';

function DateRangePicker({closeModal}) {

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

  const { data: blockedDatesData } = useQuery(QUERY_BLOCKED_DATES);
  const allBlockedDates = blockedDatesData?.blockedDates || [];

  
const blockedDates = allBlockedDates.map((date) => {
  return { date: date.date };
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
      blockedDates.some((blockedDate) => {
        return (
          blockedDate.date === formattedDate ||
          new Date(blockedDate.date).getTime() === date.getTime()
        );
      }) ||
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
        await addRequest({
          variables: {
            startDate: mainDates.startDate,
            endDate: mainDates.endDate,
            requestAuthor: Auth.getProfile().data.username,
          },
        });
      } else if (mainDates.startDate && mainDates.endDate === '') {
        await addRequest({
          variables: {
            startDate: mainDates.startDate,
            endDate: mainDates.startDate,
            requestAuthor: Auth.getProfile().data.username,
          },
        });
      }

      closeModal();
      setMainDates({startDate: '', endDate: ''})
    } catch (err) {
      console.error(err);
    }
  }


  const handlePreviousMonth = () => {
    const newMonth = new Date(month.getFullYear(), month.getMonth() - 1);
    setMonth(newMonth);
  };

  const handleNextMonth = () => {
    const newMonth = new Date(month.getFullYear(), month.getMonth() + 1);
    setMonth(newMonth);
  };

  const renderCalendar = () => {
    const { startDate: currentStartDate, endDate: currentEndDate } = selectedDates;
    const monthDays = getDaysInMonth(month.getFullYear(), month.getMonth());
    const monthStartWeekday = new Date(month.getFullYear(), month.getMonth(), 1).getDay();
    const monthEndWeekday = new Date(month.getFullYear(), month.getMonth(), monthDays).getDay();
    const calendarDays = [];

    for (let i = monthStartWeekday; i > 0; i--) {
      calendarDays.push(null);
    }

    for (let i = 1; i <= monthDays; i++) {
      const date = new Date(month.getFullYear(), month.getMonth(), i);
      calendarDays.push(date);
    }

    for (let i = monthEndWeekday; i < 6; i++) {
      calendarDays.push(null);
    }

    return (
      <div className="calendar">
        <div className="month-header">
          <button className='prevButton' onClick={handlePreviousMonth}>Prev</button>
          <h2>{`${month.toLocaleString('default', { month: 'long' })} ${month.getFullYear()}`}</h2>
          <button className='nextButton' onClick={handleNextMonth}>Next</button>
        </div>
        <div className="weekday-header">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(weekday => (
            <div key={weekday}>{weekday}</div>
          ))}
        </div>
        <div className="calendar-grid">
          {calendarDays.reduce((rows, date, index) => {
            if (index % 7 === 0) {
              rows.push([date]);
            } else {
              rows[rows.length - 1].push(date);
            }
            return rows;
          }, []).map((row, rowIndex) => (
            <div key={`row-${rowIndex}`} className="calendar-row">
              {row.map((date, index) => {
                if (!date) {
                  return <div key={`blank-${index}`} className="calendar-day"></div>;
                }

                const isBlocked = isBlockedDate(date);
                const isStartSelected = currentStartDate && date.toLocaleDateString() === currentStartDate.toLocaleDateString();
                const isEndSelected = currentEndDate && date.toLocaleDateString() === currentEndDate.toLocaleDateString();
                const isSelected = isStartSelected || isEndSelected;
                // const isSingleDate = (isStartSelected && !isEndSelected) || (!isStartSelected && isEndSelected);
                const isInRange =
                  currentStartDate &&
                  currentEndDate &&
                  date > currentStartDate &&
                  date < currentEndDate &&
                  !isBlocked;
                const isCurrentDay = date.toDateString() === new Date().toDateString(); //check if the date is the current day

                return (
                  <div
                      key={date.toISOString()}
                      className={`calendar-day${isBlocked ? ' blocked' : ''}${isSelected ? ' selected' : ''}${isInRange ? ' in-range' : ''}${isCurrentDay ? ' current-day' : ''}`}
                      onClick={() => !isBlocked && handleDateClick(date)}
                    >
                      {date.getDate()}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="date-range-picker">
      <div className='confirm-container'>
        <div className={`confirm-date ${(selectedDates.startDate ? `selected` : ``)}`}>Start Date <br/>{(selectedDates.startDate ? `${mainDates.startDate}`: '')}</div>
        <div className={`confirm-date ${(selectedDates.endDate ? `selected` : ``)}`}>End Date <br/>{(selectedDates.endDate ? `${mainDates.endDate}` : '')}</div>
      </div>
      {renderCalendar()}
      <button className='confirm-request-button' onClick={createRequest} disabled={(selectedDates.startDate && selectedDates.endDate ? false : true)}>Confirm Request</button>
    </div>
  );
}

export default DateRangePicker;
