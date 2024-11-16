export const dateToStrParser = (dateInput) => {
    const now = new Date();
    const date = new Date(dateInput); // This works for both Date objects and date strings
  
    if (isNaN(date.getTime())) {
      // Invalid date
      return 'Invalid date';
    }
  
    // Time difference in milliseconds
    const diff = now - date;
    const oneDayInMilliseconds = 86400000;
  
    let daysStr = '';
  
    if (diff <= oneDayInMilliseconds) {
      daysStr = 'Today';
    } else {
      const days = Math.floor(diff / oneDayInMilliseconds);
      daysStr = days === 1 ? '1 day ago' : `${days} days ago`;
    }
  
    // Format hours and minutes properly
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
  
    return `${daysStr}, ${hours}:${minutes}`;
  };
  