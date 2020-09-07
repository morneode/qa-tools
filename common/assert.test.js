const { assert, assertFunction } = require('./assert');
assert(5 === 5, 'A SUCCESS case: 5 is equal to one another');
assert(5 === 4, 'An ERROR case: 5 is not equal to 4 to one another');

const functionToBeTested = (x, y) => {
  return x + y;
};
assertFunction(
  functionToBeTested(1, 2),
  3,
  'A SUCCESS case: assertFunction should succeed if function returns correct answer'
);

assertFunction(
  functionToBeTested(3, 2),
  3,
  'A ERROR case: assertFunction should fail if function returns wrong answer'
);
