'use strict';
const {
  By,
  firefoxDriver,
  chromeDriver,
  safariDriver,
  until
} = require('../common/selenium');
const { sleep } = require('../common/sleep');

const { convertTimeToSeconds } = require('../common/time');

exports.getVideoLength = async videoToGetTheLength => {
  const driver = await firefoxDriver();
  try {
    await driver.get(videoToGetTheLength);
    await sleep(2000).then(() => infoLog('Loading Video...'));

    try {
      // const script = "alert('Alert via selenium')";
      const script = `
      var videoLength = document.querySelector('.ytp-time-duration').innerHTML;
      return videoLength`;
      // `alert();
      //   $('.ytp-time-duration').innerHTML;"`
      videoTimeInSeconds = await driver
        .executeScript(script)
        .then(function(return_value) {
          return convertTimeToSeconds(return_value);
        });
    } catch (error) {
      errorLog('Could not run script', error);
    }

    // pause and resume every 10% of total time
  } finally {
    // await driver.quit().then(() => console.log('Closed webdriver'));
  }
  console.log(`returning ${videoTimeInSeconds}`);
  return Promise.resolve(videoTimeInSeconds);
};

exports.getVideoCurrentLength = async driver => {
  let videoTimeInSeconds = 10;
  try {
    // const script = "alert('Alert via selenium')";
    const script = `
    //var videoLength = document.querySelector('.ytp-time-duration').innerHTML;
    //console.log(videoLength);
    return document.querySelector('.ytp-time-duration').innerHTML;`;
    // `alert();
    //   $('.ytp-time-duration').innerHTML;"`
    videoTimeInSeconds = await driver
      .executeScript(script)
      .then(function(return_value) {
        return convertTimeToSeconds(return_value);
      });
  } catch (error) {
    errorLog('Could not run script', error);
  }
  return Promise.resolve(videoTimeInSeconds);
};

exports.getVideoCurrentPosition = async driver => {
  let videoTimeInSeconds = 10;
  try {
    // const script = "alert('Alert via selenium')";
    const script = `
    // var videoPosition = document.querySelector('.ytp-time-current').innerHTML;
    // console.log(videoPosition);
    return document.querySelector('.ytp-time-current').innerHTML;`;
    // `alert();
    //   $('.ytp-time-duration').innerHTML;"`
    videoTimeInSeconds = await driver
      .executeScript(script)
      .then(function(return_value) {
        return convertTimeToSeconds(return_value);
      });
  } catch (error) {
    errorLog('Could not run script', error);
  }
  return Promise.resolve(videoTimeInSeconds);
};
