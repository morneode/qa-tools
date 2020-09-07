const { assert, assertFunction } = require('./assert');

const findBiggestValue = listOfNumbers => {
  let biggestValue;
  for (let i = 0; i < listOfNumbers.length; i++) {
    if (i === 0) {
      biggestValue = listOfNumbers[i];
    } else {
      if (listOfNumbers[i] > biggestValue) {
        biggestValue = listOfNumbers[i];
      }
    }
  }
  if (typeof biggestValue !== 'undefined') {
    return biggestValue;
  } else {
    return 'The list was empty';
  }
};

assert(findBiggestValue([1, 4, 6, 10]) === 10, 'testing with [1, 4, 6, 10]');
assert(findBiggestValue([10, 4, 6, 1]) === 10, 'testing with [10, 4, 6, 1]');
assert(findBiggestValue([1, 4, 10, 6]) === 10, 'testing with [1, 4, 10, 6]');
assert(findBiggestValue([]) === 'The list was empty', 'testing with []');

console.log('========================');
console.log('Arrays and the for loop:');

const awesomeFunction = someArray => {
  let biggestValue;
  let smallestValue;
  let sum = 0;
  let ave;
  for (let x = 0; x < someArray.length; x = x + 1) {
    if (x === 0) {
      biggestValue = someArray[x];
      smallestValue = someArray[x];
    } else {
      if (someArray[x] > biggestValue) {
        biggestValue = someArray[x];
      }
      if (someArray[x] < smallestValue) {
        smallestValue = someArray[x];
      }
    }
    sum = sum + someArray[x];
  }
  ave = sum / someArray.length;
  return {
    biggestValue: biggestValue,
    smallestValue: smallestValue,
    sum: sum,
    ave: ave
  };
};

const test = awesomeFunction([3, 6, 1]);
console.log(awesomeFunction([3, 6, 1]));
assert(awesomeFunction([3, 6, 1]).biggestValue === 6);
assert(awesomeFunction([3, 6, 1]).smallestValue === 1);
assert(awesomeFunction([3, 6, 1]).sum === 10);
assert(awesomeFunction([3, 6, 1]).ave === 10 / 3);

question1Object = {
  '1a.option': 0,
  '1b.option': 2,
  '1c.option': 7
};

question2Object = {
  '2a.option': 1,
  '2b.option': 3,
  '2c.option': 5
};

question3Object = {
  '3a.option': 1,
  '3b.option': 3,
  '3c.option': 5
};

const allOptionsMapped = (question1, question2) => {
  let result = {};
  for (let key in question1) {
    for (let key2 in question2) {
      let newKey = key + ', ' + key2;
      let newValue = question1[key] + question2[key2];
      result[newKey] = newValue;
    }
  }
  return result;
};

allOptionsMapped(question1Object, question2Object);

const combineObjects = (obj1, obj2) => {
  for (var key in obj2) {
    obj1[key] = obj2[key];
  }
  return obj1;
};

const allOptionsArray = questions => {
  let result = {};

  for (let x = 0; x < questions.length; x = x + 1) {
    if (Object.keys(result).length === 0) {
      result = combineObjects(result, questions[x]);
    } else {
      result = allOptionsMapped(result, questions[x]);
    }
  }
  return result;
};

assert(
  allOptionsArray([question1Object, question2Object, question3Object])[
    '1a.option, 2b.option, 3b.option'
  ] === 6,
  '1a.option, 2b.option, 3b.option === 6'
);

assert(
  allOptionsArray([question1Object, question2Object, question3Object])[
    '1c.option, 2c.option, 3b.option'
  ] === 15,
  '1c.option, 2c.option, 3b.option === 15'
);
assert(
  allOptionsArray([question1Object, question2Object, question3Object])[
    '1b.option, 2b.option, 3c.option'
  ] === 10,
  '1b.option, 2b.option, 3c.option === 10'
);

console.log(
  'All options:',
  allOptionsArray([question1Object, question2Object, question3Object])
);
