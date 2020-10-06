const { assert } = require('./assert');
const { convertTimeToSeconds } = require('./time');

console.log(convertTimeToSeconds('1:42'));
assert(convertTimeToSeconds('1:00') === 60, 'convert to time');
assert(convertTimeToSeconds('1:10') === 70, 'convert to time');
assert(convertTimeToSeconds('0:10') === 10, 'convert to time');
assert(convertTimeToSeconds('1:42') === 102, 'convert to time');
