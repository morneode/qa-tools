const { usingRequest } = require('./rest-api');
const { assertFunction } = require('./assert');

const result = usingRequest();
console.log(result);
assertFunction(
  JSON.parse(result).coord,
  '{"lon":28.04,"lat":-26.2}',
  'Returns the correct lat and lon'
);
