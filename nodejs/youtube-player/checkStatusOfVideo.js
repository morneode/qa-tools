const { infoLog, errorLog } = require('../common/logs');
const { getVideoCurrentPosition, getVideoLength } = require('./getVideoLength');
exports.videostatus = {
  playing: 'playing',
  paused: 'paused'
};

exports.checkStatusOfVideo = async driver => {
  const currentVideoTime = await getVideoCurrentPosition(driver);
  await driver.sleep(1500);
  const newCurrentVideoTime = await getVideoCurrentPosition(driver);
  let result = '';
  if (currentVideoTime === newCurrentVideoTime) result = videostatus.paused;
  else result = videostatus.playing;
  return result;
};

exports.playVideoIfPaused = async (name, driver) => {
  let videoStatus = await checkStatusOfVideo(driver);
  while (videoStatus === videostatus.paused) {
    video.sendKeys(' ');
    videoStatus = await checkStatusOfVideo(driver);
    if (videoStatus === videostatus.playing)
      infoLog(`Using ${name},Video is playing`);
    else infoLog(`Using ${name}, video is paused`);
  }
};

exports.waitTillAdIsDone = async (name, videoToWatch, driver) => {
  let countAdCheck = 0;
  let currentVideoLength = await getCurrentVideoLength(driver);
  while (!(Math.abs(currentVideoLength - videoToWatch.videoLength) <= 1)) {
    await playVideoIfPaused(driver);
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
};
