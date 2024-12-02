import React from 'react';
import { formatDistanceToNow } from 'date-fns';

const TimeAgo = ({ timestamp }) => {
  const date = new Date(timestamp);

  if (isNaN(date.getTime())) {
    console.error(`Invalid timestamp: '${timestamp}'`);
    return <span>Invalid Date</span>;
  }

  const timeAgo = formatDistanceToNow(date, { addSuffix: true });
  return <span>{timeAgo}</span>;
};

export default TimeAgo;
