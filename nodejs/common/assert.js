exports.assert = (conditionToPass, msgToPrint = '') => {
  if (conditionToPass) {
    console.log('ASSERT:SUCCESS:', msgToPrint);
  } else {
    console.error('ASSERT:ERROR:  ', msgToPrint);
  }
};

exports.assertFunctionWithParams = (
  functionToTest,
  expectedResult,
  msgToPrint = '',
  ...functionParams
) => {
  if (functionToTest(functionParams) === expectedResult) {
    console.log('ASSERT:SUCCESS:', msgToPrint);
  } else {
    console.error(
      'ASSERT:ERROR:',
      msgToPrint,
      '=>',
      functionToTest(functionParams),
      ' was not equal to ',
      expectedResult
    );
  }
};

exports.assertFunction = (functionToTest, expectedResult, msgToPrint = '') => {
  if (functionToTest === expectedResult) {
    console.log('ASSERT:SUCCESS:', msgToPrint);
  } else {
    console.error(
      'ASSERT:ERROR:',
      msgToPrint,
      '=>',
      functionToTest,
      ' was not equal to ',
      expectedResult
    );
  }
};
