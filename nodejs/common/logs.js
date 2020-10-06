const formatDate = () => {
  let current_datetime = new Date();
  let formatted_date =
    current_datetime.getFullYear() +
    '-' +
    (current_datetime.getMonth() + 1) +
    '-' +
    current_datetime.getDate() +
    ' ' +
    current_datetime.getHours() +
    ':' +
    current_datetime.getMinutes() +
    ':' +
    current_datetime.getSeconds();
  return formatted_date;
};

exports.infoLog = msg => {
  console.log(`INFO: ${formatDate()} ${msg}`);
};
exports.errorLog = msg => {
  console.error(`ERROR: ${formatDate()} ${msg}`);
};
