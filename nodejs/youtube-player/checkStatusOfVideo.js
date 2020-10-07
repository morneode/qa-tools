'use strict';
const { infoLog, errorLog } = require('../common/logs');
const {
  getVideoCurrentPosition,
  getVideoCurrentLength
} = require('./getVideoLength');
const { convertTimeToSeconds } = require('../common/time');
const { sleep } = require('../common/sleep');

exports.videostatus = {
  playing: 'playing',
  paused: 'paused'
};

exports.checkStatusOfVideo = async driver => {
  const currentVideoTime = await getVideoCurrentPosition(driver);
  await sleep(2000);
  const newCurrentVideoTime = await getVideoCurrentPosition(driver);

  let result;
  if (currentVideoTime === newCurrentVideoTime)
    result = this.videostatus.paused;
  else result = this.videostatus.playing;
  infoLog(
    `checkStatusOfVideo: ${result} ${currentVideoTime}vs${newCurrentVideoTime}`
  );
  return Promise.resolve(result);
};

exports.playVideoIfPaused = async (name, video, driver) => {
  let videoStatus = await this.checkStatusOfVideo(driver);
  while (videoStatus !== this.videostatus.playing) {
    // if (videoStatus !== this.videostatus.playing) {
    infoLog(
      `playVideoIfPaused:Using ${name}, the video was ${videoStatus}, ${videoStatus !==
        this.videostatus.playing}`
    );
    video.sendKeys(' ');

    videoStatus = await this.checkStatusOfVideo(driver);
    // infoLog(`Using ${name},video is ${videoStatus}`);
  }
  infoLog(`playVideoIfPaused:Using ${name},video is ${videoStatus}`);
  return Promise.resolve('');
};

exports.waitTillAdIsDone = async (name, video, videoToWatch, driver) => {
  let countAdCheck = 0;
  let currentVideoLength = await getVideoCurrentLength(driver);
  while (!(Math.abs(currentVideoLength - videoToWatch.videoLength) <= 1)) {
    if (countAdCheck % 10 === 0) {
      await this.playVideoIfPaused(name, video, driver);
      infoLog(
        `waitTillAdIsDone: Using ${name}: Ad is playing, ${videoToWatch.videoLength} vs ${currentVideoLength}`
      );
    }
    countAdCheck++;
    await sleep(1500);
    currentVideoLength = await getVideoCurrentLength(driver);
    if (Math.abs(currentVideoLength - videoToWatch.videoLength) <= 1)
      infoLog(
        `waitTillAdIsDone: Using ${name}, Time match.. Required video was launched`
      );
  }
  return Promise.resolve('');
};
