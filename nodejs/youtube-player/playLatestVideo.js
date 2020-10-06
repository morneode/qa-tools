const {
  By,
  firefoxDriver,
  chromeDriver,
  safariDriver,
  until
} = require('../common/selenium');
const {infoLog, errorLog} = require('../common/logs')
const { sleep } = require('../common/sleep');

exports.playLatestVideo = (channelToWatch) => {
  let driver = await firefoxDriver();
  try {
    await driver.get(channelToWatch);
    await sleep(2000).then(() => infoLog('Loading Video...'));
    await driver
      .findElement(
        By.css(
          'ytd-grid-video-renderer.style-scope:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > h3:nth-child(1) > a:nth-child(2)'
        )
      )
      .click();
    await sleep(2000).then(() => infoLog('Loaded Video...'));

    //https://stackoverflow.com/questions/39392479/how-to-mute-all-sounds-in-chrome-webdriver-with-selenium
    //https://stackoverflow.com/questions/19103635/executing-commands-using-selenium-webdriver-in-node-javascript
    //https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs
    //https://stackoverflow.com/questions/15596753/how-do-i-get-video-durations-with-youtube-api-version-3

    const video = await driver.findElement(By.css('body'));
    video.sendKeys('m');
    await sleep(30000).then(() => infoLog('Sleeping for 30s...'));
    video.sendKeys('>>>>');
    // pause and resume every 10% of total time
  } finally {
    // await driver.quit().then(() => console.log('Closed webdriver'));
  }
}

playLatestVideo('https://www.youtube.com/c/LinusTechTips/videos');
playLatestVideo('https://www.youtube.com/c/jacksepticeye/videos');
playLatestVideo('https://www.youtube.com/user/enricood/videos');
