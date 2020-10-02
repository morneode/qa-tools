exports.sleep = (milliseconds, msg) => {
  if (msg) console.log(msg);
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};
