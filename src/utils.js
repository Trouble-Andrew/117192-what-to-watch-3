const extend = (a, b) => {
  return Object.assign({}, a, b);
};

const convertMinsToHrsMins = function (mins) {
  let h = Math.floor(mins / 60);
  let m = mins % 60;
  h = h < 10 ? `` + h : h;
  m = m < 10 ? `0` + m : m;
  return `${h}h ${m}m`;
};

const convertSeconds = function (time) {
  let hrs = ~~(time / 3600);
  let mins = ~~((time % 3600) / 60);
  let secs = ~~time % 60;

  let ret = ``;

  if (hrs > 0) {
    ret += `` + hrs + `:` + (mins < 10 ? `0` : ``);
  }

  ret += `` + mins + `:` + (secs < 10 ? `0` : ``);
  ret += `` + secs;
  return ret;
};

export {extend, convertMinsToHrsMins, convertSeconds};
