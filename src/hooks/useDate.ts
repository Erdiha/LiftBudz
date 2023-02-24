import { useState, useEffect } from 'react';

export function useTimeAgo(date: any) {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    const dateObj = new Date(date);
    const now = new Date();
    const seconds = Math.round(
      Math.abs((now.getTime() - dateObj.getTime()) / 1000),
    );
    const minutes = Math.round(seconds / 60);
    const hours = Math.round(minutes / 60);
    const days = Math.round(hours / 24);
    const weeks = Math.round(days / 7);
    const months = Math.round(days / 30);

    if (seconds < 60) {
      setTimeAgo(`${seconds} second${seconds === 1 ? '' : 's'} ago`);
    } else if (minutes < 60) {
      setTimeAgo(`${minutes} minute${minutes === 1 ? '' : 's'} ago`);
    } else if (hours < 24) {
      setTimeAgo(`${hours} hour${hours === 1 ? '' : 's'} ago`);
    } else if (days < 7) {
      setTimeAgo(`${days} day${days === 1 ? '' : 's'} ago`);
    } else if (weeks < 4) {
      setTimeAgo(`${weeks} week${weeks === 1 ? '' : 's'} ago`);
    } else if (months < 12) {
      setTimeAgo(`${months} month${months === 1 ? '' : 's'} ago`);
    } else {
      setTimeAgo(dateObj.toLocaleDateString());
    }
  }, [date]);

  return timeAgo;
}
