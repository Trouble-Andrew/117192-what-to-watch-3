const extend = (a, b) => {
  return Object.assign({}, a, b);
};

const convertMinsToHrsMins = function (minutes) {
  let hour = Math.floor(minutes / 60);
  let minute = minutes % 60;
  hour = hour < 10 ? `` + hour : hour;
  minute = minute < 10 ? `0` + minute : minute;
  return `${hour}h ${minute}m`;
};

const convertSeconds = function (time) {
  let hours = ~~(time / 3600);
  let minutes = ~~((time % 3600) / 60);
  let seconds = ~~time % 60;

  let result = ``;

  if (hours > 0) {
    result += `` + hours + `:` + (minutes < 10 ? `0` : ``);
  }

  result += `` + minutes + `:` + (seconds < 10 ? `0` : ``);
  result += `` + seconds;
  return result;
};

export {extend, convertMinsToHrsMins, convertSeconds};
