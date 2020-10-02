const { By, firefoxDriver } = require('../common/selenium');
const { sleep } = require('../common/sleep');

const videoAndLength = (videoURL, videoLength) => {
  return { videoURL: videoURL, videoLength: videoLength };
};

const videosToWatchWithFirefox = [
  videoAndLength('https://www.youtube.com/watch?v=FzlxoVc3QVU', 20),
  videoAndLength('https://www.youtube.com/watch?v=yQSJ-xBUSEk', 20),
  videoAndLength('https://www.youtube.com/watch?v=WV99WRKhAik', 20)
];

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
    await sleep(2000, 'Going to load the video').then(() =>
      console.log(new Date(), ' Loading video...')
    );

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

async function playListOfVideosWithFirefox(videosToPlay) {
  const driver = await firefoxDriver();

  // videos.forEach(element => {
  for (let i = 0; i < videosToPlay.length; i++) {
    let video = videosToPlay[i];
    console.log('Playing:', video.videoURL, video.videoLength);
    // await playVideoWithDriver(driver, video).then(value =>
    //   console.log('The value is ', value)
    // );
    await playVideoWithDriver(driver, video, i);
  }
}
playListOfVideosWithFirefox(videosToWatchWithFirefox);

console.log('DONE...');
