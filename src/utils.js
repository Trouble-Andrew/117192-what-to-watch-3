const extend = (a, b) => {
  return Object.assign({}, a, b);
};

const convertMinsToHrsMins = function (mins) {
  let hour = Math.floor(mins / 60);
  let minute = mins % 60;
  hour = hour < 10 ? `` + hour : hour;
  minute = minute < 10 ? `0` + minute : minute;
  return `${hour}h ${minute}m`;
};

const convertSeconds = function (time) {
  let hrs = ~~(time / 3600);
  let mins = ~~((time % 3600) / 60);
  let secs = ~~time % 60;

  let result = ``;

  if (hrs > 0) {
    result += `` + hrs + `:` + (mins < 10 ? `0` : ``);
  }

  result += `` + mins + `:` + (secs < 10 ? `0` : ``);
  result += `` + secs;
  return result;
};

export {extend, convertMinsToHrsMins, convertSeconds};
