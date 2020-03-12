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

export {extend, convertMinsToHrsMins};
