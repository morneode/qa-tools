const { Builder, By, Key, until } = require('selenium-webdriver');

exports.By = By;

exports.firefoxDriver = async () =>
  await new Builder().forBrowser('firefox').build();

exports.chromeDriver = async () =>
  await new Builder().forBrowser('chrome').build();
