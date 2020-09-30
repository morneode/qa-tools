const { By } = require('selenium-webdriver');
const { sleep } = require('./sleep');
const moment = require('moment');

exports.signup = async (driver, signupDetails) => {
  try {
    await driver.get(signupDetails.signupPage);
    await sleep(2000).then(() => console.log('Waiting...'));
    await driver.getTitle().then(function(title) {
      console.log('title = ' + title);
    });
    await driver
      .findElement(By.id('firstName'))
      .sendKeys(signupDetails.firstName);
    await driver
      .findElement(By.id('lastName'))
      .sendKeys(signupDetails.lastName);
    let emailAddress = this.getRandomEmail(
      signupDetails.firstName,
      signupDetails.partner
    );

    console.log(emailAddress);
    await driver.findElement(By.id('emailAddress')).sendKeys(emailAddress);
    await driver
      .findElement(By.id('password'))
      .sendKeys(signupDetails.password);

    await driver.findElement(By.id('btn-signup')).click();
  } catch (exc) {
    console.log('some error happened:', exc);
  }
};

exports.getRandomEmail = (name, specific) => {
  console.log('get Random Email');
  let now = moment();
  console.log(`now = ${now}`);
  let dateUnique = moment().format('kkmmss-DDMMYY');
  console.log(`dateUnique = ${dateUnique}`);
  return `${name}${dateUnique}${specific}@companyxqa.com`;
};

exports.login = async (url, email, password, thenGoHere, driver) => {
  await driver.get(url);
  await sleep(2000).then(() => console.log('Waiting...'));
  await driver.getTitle().then(function(title) {
    console.log('title = ' + title);
  });
  await driver.findElement(By.id('emailAddress')).sendKeys(email);
  await driver.findElement(By.id('password')).sendKeys(password);
  await driver.findElement(By.id('btn-login')).click();
  console.log('logged in');
  if (thenGoHere) await driver.get(thenGoHere);
  await sleep(2000).then(() => console.log('Waiting...'));
};
