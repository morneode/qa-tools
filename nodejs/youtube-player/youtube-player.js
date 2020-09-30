const { By, firefoxDriver } = require('../common/selenium');
const { sleep } = require('../common/sleep');

async function playLatestVideo(channelToWatch) {
  let driver = await firefoxDriver();
  // let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get(channelToWatch);
    await sleep(2000).then(() => console.log('Waiting...'));
    await driver
      .findElement(
        By.css(
          'ytd-grid-video-renderer.style-scope:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > h3:nth-child(1) > a:nth-child(2)'
        )
      )
      .click();
    await sleep(2000).then(() => console.log('Waiting...'));

    // const video = driver.findElement(By.tagName('video'));
    // driver.executeScript('arguments[0].muted = true;', video);
    const video = await driver.findElement(By.css('body'));
    video.sendKeys('m');
    await sleep(30000).then(() => console.log('Waiting...'));
    video.sendKeys('>>>>');
  } finally {
    // await driver.quit().then(() => console.log('Closed webdriver'));
  }
}
playLatestVideo('https://www.youtube.com/c/LinusTechTips/videos');
// playLatestVideo('https://www.youtube.com/c/jacksepticeye/videos');
console.log('DONE...');
