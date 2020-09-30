const { By, firefoxDriver } = require('../common/selenium');
const { sleep } = require('../common/sleep');

async function watchVideo(channelToWatch) {
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
    // await driver.getTitle().then(function(title) {
    //   console.log('The title is: ' + title);
    // });
    // await sleep(2000).then(() => console.log('Waiting...'));
    // await driver
    //   .findElement(By.name('q'))
    //   .sendKeys('webdriver', Key.RETURN)
    //   .then(() => console.log('Search query entered..'));
    // await sleep(2000).then(() => console.log('Waiting...'));
    // await driver
    //   .wait(until.titleIs('webdriver - Google Search'), 10000)
    //   .then(() => console.log('The title is correct'));
    // await sleep(5000).then(() => console.log('Waiting...'));
  } finally {
    // await driver.quit().then(() => console.log('Closed webdriver'));
  }
}
// watchVideo('https://www.youtube.com/c/LinusTechTips/videos');
watchVideo('https://www.youtube.com/c/jacksepticeye/videos');
console.log('DONE...');
