const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');

exports.By = By;
exports.until = until;

exports.firefoxDriver = async () =>
  await new Builder().forBrowser('firefox').build();

exports.chromeDriver = async () =>
  await new Builder().forBrowser('chrome').build();

exports.safariDriver = async () =>
  await new Builder().forBrowser('safari').build();
