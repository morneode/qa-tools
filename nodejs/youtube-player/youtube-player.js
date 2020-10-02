const {
  By,
  firefoxDriver,
  chromeDriver,
  safariDriver,
  until
} = require('../common/selenium');
const { sleep } = require('../common/sleep');

const videoAndLength = (videoURL, videoLengthInSeconds) => {
  return { videoURL: videoURL, videoLength: videoLengthInSeconds };
};

const videosToWatch = [
  videoAndLength('https://www.youtube.com/watch?v=FzlxoVc3QVU', 20),
  videoAndLength('https://www.youtube.com/watch?v=yQSJ-xBUSEk', 20),
  videoAndLength('https://www.youtube.com/watch?v=WV99WRKhAik', 20)
];

const infoLog = msg => {
  console.log(`INFO: ${new Date()} ${msg}`);
};
const errorLog = msg => {
  console.error(`ERROR: ${new Date()} ${msg}`);
};

async function playLatestVideo(channelToWatch) {
  let driver = await firefoxDriver();
  // let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get(channelToWatch);
    await sleep(2000).then(() => console.log(new Date(), ' Loading Video...'));
    await driver
      .findElement(
        By.css(
          'ytd-grid-video-renderer.style-scope:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > h3:nth-child(1) > a:nth-child(2)'
        )
      )
      .click();
    await sleep(2000).then(() => console.log(new Date(), ' Loaded Video...'));

    //https://stackoverflow.com/questions/39392479/how-to-mute-all-sounds-in-chrome-webdriver-with-selenium
    //https://stackoverflow.com/questions/19103635/executing-commands-using-selenium-webdriver-in-node-javascript
    //https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs
    //https://stackoverflow.com/questions/15596753/how-do-i-get-video-durations-with-youtube-api-version-3

    const video = await driver.findElement(By.css('body'));
    video.sendKeys('m');
    await sleep(30000).then(() =>
      console.log(new Date(), ' Sleeping for 30s...')
    );
    video.sendKeys('>>>>');
    // pause and resume every 10% of total time
  } finally {
    // await driver.quit().then(() => console.log('Closed webdriver'));
  }
}
// playLatestVideo('https://www.youtube.com/c/LinusTechTips/videos');
// playLatestVideo('https://www.youtube.com/c/jacksepticeye/videos');
// playLatestVideo('https://www.youtube.com/user/enricood/videos');

async function playVideoWithDriver(driver, videoToWatch, positionInList) {
  try {
    await driver.get(videoToWatch.videoURL);

    infoLog('waiting to load');
    await driver.wait(until.elementLocated(By.css('body')));
    infoLog('Loaded');
    await driver.sleep(1000);
    infoLog('Sleep for 1s');

    // await sleep(2000, 'Going to load the video').then(() =>
    //   console.log(new Date(), ' Loading video...')
    // );

    //https://stackoverflow.com/questions/39392479/how-to-mute-all-sounds-in-chrome-webdriver-with-selenium
    //https://stackoverflow.com/questions/19103635/executing-commands-using-selenium-webdriver-in-node-javascript
    //https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs
    //https://stackoverflow.com/questions/15596753/how-do-i-get-video-durations-with-youtube-api-version-3

    const video = await driver.findElement(By.css('body'));
    if (positionInList === 0) video.sendKeys('m');
    // await sleep(30000).then(() => console.log('Waiting...'));
    // video.sendKeys('>>>>');
    console.log('videoToWatch.videoLength:', videoToWatch.videoLength * 1000);
    await sleep(videoToWatch.videoLength * 1000).then(() =>
      console.log(new Date(), ' Going to next video')
    );
    // pause and resume every 10% of total time
  } finally {
    // await driver.quit().then(() => console.log('Closed webdriver'));
  }
  return Promise.resolve(0);
}

async function playListOfVideosWithDriver(name, driverToUse, videosToPlay) {
  try {
    const driver = await driverToUse();

    // videos.forEach(element => {
    for (let i = 0; i < videosToPlay.length; i++) {
      let video = videosToPlay[i];
      infoLog(
        `Using ${name}, playing ${video.videoURL} for ${video.videoLength}`
      );

      // await playVideoWithDriver(driver, video).then(value =>
      //   console.log('The value is ', value)
      // );
      await playVideoWithDriver(driver, video, i);
    }
  } catch (error) {
    errorLog(`Using ${name} got the following `, error);
  } finally {
  }
}
infoLog('Starting Up');
playListOfVideosWithDriver('FireFox', firefoxDriver, videosToWatch);
playListOfVideosWithDriver('Chrome', chromeDriver, videosToWatch);
// playListOfVideosWithDriver('Safari', safariDriver, videosToWatch);

console.log('DONE...');
