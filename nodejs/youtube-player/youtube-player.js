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
for (i = 0; i < 10; i++) {
  videosToPromote.push(
    videoAndLength(
      'https://www.youtube.com/watch?v=OMeyncco4jQ',
      convertTimeToSeconds('6:52')
    )
  );
}

const isVideoPlaying = async driver => {
  let videoTimeInSeconds = 10;
  try {
    // const script = "alert('Alert via selenium')";
    const script = `
    // var videoLength = document.querySelector('.ytp-time-duration').innerHTML;
    var videoLength = document.querySelector('.ytp-time-current').innerHTML;
    //console.log(videoLength);
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
  return Promise.resolve(videoTimeInSeconds);
};

const getCurrentVideoLength = async driver => {
  let videoTimeInSeconds = 10;
  try {
    // const script = "alert('Alert via selenium')";
    const script = `
    var videoLength = document.querySelector('.ytp-time-duration').innerHTML;
    //console.log(videoLength);
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
  return Promise.resolve(videoTimeInSeconds);
};

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

    let currentVideoTime = await isVideoPlaying(driver);
    await driver.sleep(1500);
    let newCurrentVideoTime = await isVideoPlaying(driver);
    while (newCurrentVideoTime === currentVideoTime) {
      video.sendKeys(' ');
      await driver.sleep(1500);
      newCurrentVideoTime = await isVideoPlaying(driver);
      if (newCurrentVideoTime !== currentVideoTime)
        infoLog(`Using ${name},Video is playing`);
      else infoLog(`Using ${name}, video is paused`);
    }

    let countAdCheck = 0;
    let currentVideoLength = await getCurrentVideoLength(driver);
    while (!(Math.abs(currentVideoLength - videoToWatch.videoLength) <= 1)) {
      if (countAdCheck % 10 === 0)
        infoLog(
          `${name}: Ad is playing, ${videoToWatch.videoLength} vs ${currentVideoLength}`
        );
      countAdCheck++;
      await driver.sleep(1000);
      currentVideoLength = await getCurrentVideoLength(driver);
      if (Math.abs(currentVideoLength - videoToWatch.videoLength) <= 1)
        infoLog(`Using ${name}, Time match.. Required video was launched`);
    }

    const pauseTimeEveryXseconds = 10 * 60;
    const timesToPause = Math.floor(
      currentVideoLength / pauseTimeEveryXseconds
    );

    if (timesToPause < 1) {
      infoLog(`sleeping until video is done`);
      await sleep(videoToWatch.videoLength * 1000);
      infoLog(`Finished playing the video`);
    } else {
      // let videoTimeInSeconds = getCurrentVideoLength(driver);
      // const pauseResumeTime = Math.floor((videoTimeInSeconds * 1000) / 3);
      // const pauseResumeTime = 40;
      const pauseResumeTime = Math.floor(
        videoToWatch.videoLength / timesToPause
      );
      infoLog(`Will pause/resume every ${pauseResumeTime}s`);
      for (i = 0; i < timesToPause; i++) {
        try {
          await sleep(pauseResumeTime * 1000);
          infoLog(`${name}: pausing`);
          video.sendKeys(' ');
          await driver.sleep(1000);
          infoLog(`${name}: playing`);
          video.sendKeys(' ');
        } catch (error) {
          errorLog(error);
        }
      }
    }

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
    errorLog(`Using ${name} got the following `, error);
  } finally {
  }
}

infoLog('Starting Up');
playListOfVideosWithDriver('FireFox', firefoxDriver, videosToPromote);
playListOfVideosWithDriver('Chrome', chromeDriver, videosToPromote);
playListOfVideosWithDriver('FireFox', firefoxDriver, videosToPromote);
playListOfVideosWithDriver('Chrome', chromeDriver, videosToPromote);
playListOfVideosWithDriver('FireFox', firefoxDriver, videosToPromote);
playListOfVideosWithDriver('Chrome', chromeDriver, videosToPromote);
// playListOfVideosWithDriver('Safari', safariDriver, videosToWatch);
infoLog('Exitting');
