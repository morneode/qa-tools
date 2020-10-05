exports.convertTimeToSeconds = timeString => {
  const timeArray = timeString.split(':');
  let hours,
    minutes,
    seconds = 0;
  let hoursStr,
    minutesStr,
    secondsStr = '';
  if (timeArray.length === 3) {
    [hoursStr, minutesStr, secondsStr] = timeArray;
    hours = Number(hoursStr);
    minutes = Number(minutesStr);
    seconds = Number(secondsStr);
  } else if (timeArray.length === 2) {
    [minutesStr, secondsStr] = timeArray;
    hours = 0;
    minutes = Number(minutesStr);
    seconds = Number(secondsStr);
  }
  const result = hours * 3600 + minutes * 60 + seconds;

  return result;
};
