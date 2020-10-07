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
const { infoLog, errorLog } = require('../common/logs');
const {
  playVideoIfPaused,
  waitTillAdIsDone,
  checkStatusOfVideo,
  videostatus
} = require('./checkStatusOfVideo');
const {
  getVideoCurrentPosition,
  getVideoCurrentLength
} = require('./getVideoLength');

const videoAndLength = (videoURL, videoLengthInSeconds) => {
  return { videoURL: videoURL, videoLength: videoLengthInSeconds };
};

const videosToWatch = [
  videoAndLength(
    'https://www.youtube.com/watch?v=FzlxoVc3QVU',
    convertTimeToSeconds('50:45')
  ),
  videoAndLength(
    'https://www.youtube.com/watch?v=yQSJ-xBUSEk',
    convertTimeToSeconds('1:42')
  ),
  videoAndLength(
    'https://www.youtube.com/watch?v=WV99WRKhAik',
    convertTimeToSeconds('17:07')
  )
];

let videosToPromote = [];
for (let i = 0; i < 10; i++) {
  videosToPromote.push(
    videoAndLength(
      'https://www.youtube.com/watch?v=OMeyncco4jQ',
      convertTimeToSeconds('6:52')
    )
  );
}

async function playVideoWithDriver(name, driver, videoToWatch, positionInList) {
  try {
    await driver.get(videoToWatch.videoURL);

    infoLog(`Using ${name},waiting to load`);
    await driver.wait(until.elementLocated(By.css('body')));
    infoLog(`Using ${name},Loaded`);
    await driver.sleep(1000);
    infoLog(`Using ${name},Sleep for 1s`);

    //https://stackoverflow.com/questions/39392479/how-to-mute-all-sounds-in-chrome-webdriver-with-selenium
    //https://stackoverflow.com/questions/19103635/executing-commands-using-selenium-webdriver-in-node-javascript
    //https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs
    //https://stackoverflow.com/questions/15596753/how-do-i-get-video-durations-with-youtube-api-version-3

    let video = await driver.findElement(By.css('body'));
    if (positionInList === 0) {
      video.sendKeys('m');
      // video.sendKeys(' ');
    }

    infoLog('##playVideoIfPaused');
    await playVideoIfPaused(name, video, driver);
    infoLog('##waitTillAdIsDone');
    await waitTillAdIsDone(name, video, videoToWatch, driver);

    //TODO: fix the final part of the script
    let currentVideoLength = await getVideoCurrentLength(driver);
    let currentVideoPosition = await getVideoCurrentPosition(driver);
    while (currentVideoPosition < currentVideoLength) {
      infoLog(`${name}, is playing the ${videoToWatch.videoURL}`);
      await sleep(10000);
      await playVideoIfPaused(name, video, driver);
      await waitTillAdIsDone(name, video, videoToWatch, driver);
      currentVideoPosition = await getVideoCurrentPosition(driver);
      currentVideoLength = await getVideoCurrentLength(driver);
    }
    // const pauseTimeEveryXseconds = 10 * 60;
    // const timesToPause = Math.floor(
    //   currentVideoLength / pauseTimeEveryXseconds
    // );

    // if (timesToPause < 1) {
    //   infoLog(`sleeping until video is done`);
    //   await sleep(videoToWatch.videoLength * 1000);
    //   infoLog(`Finished playing the video`);
    // } else {
    //   const pauseResumeTime = Math.floor(
    //     videoToWatch.videoLength / timesToPause
    //   );
    //   infoLog(`Will pause/resume every ${pauseResumeTime}s`);
    //   for (i = 0; i < timesToPause; i++) {
    //     try {
    //       await sleep(pauseResumeTime * 1000);
    //       infoLog(`${name}: pausing`);
    //       video.sendKeys(' ');
    //       await driver.sleep(1000);
    //       infoLog(`${name}: playing`);
    //       video.sendKeys(' ');
    //     } catch (error) {
    //       errorLog(error);
    //     }
    //   }
    // }

    infoLog('Going to next video');
    // pause and resume every 10% of total time
  } finally {
    // await driver.quit().then(() => console.log('Closed webdriver'));
  }
  return Promise.resolve(0);
}

async function playListOfVideosWithDriver(name, driverToUse, videosToPlay) {
  try {
    const driver = await driverToUse();

    let runForever = false;
    do {
      for (let i = 0; i < videosToPlay.length; i++) {
        let video = videosToPlay[i];
        infoLog(
          `Using ${name}, playing ${video.videoURL} for ${video.videoLength} seconds`
        );

        // await playVideoWithDriver(driver, video).then(value =>
        //   console.log('The value is ', value)
        // );
        await playVideoWithDriver(name, driver, video, i);
      }
    } while (runForever);
  } catch (error) {
    errorLog(`Using ${name} got the following ${error}`);
  } finally {
  }
}

infoLog('Starting Up');
playListOfVideosWithDriver('FireFox', firefoxDriver, videosToPromote);
// playListOfVideosWithDriver('Chrome', chromeDriver, videosToPromote);
// playListOfVideosWithDriver('FireFox', firefoxDriver, videosToPromote);
// playListOfVideosWithDriver('Chrome', chromeDriver, videosToPromote);
// playListOfVideosWithDriver('FireFox', firefoxDriver, videosToPromote);
// playListOfVideosWithDriver('Chrome', chromeDriver, videosToPromote);
// playListOfVideosWithDriver('Safari', safariDriver, videosToWatch);
