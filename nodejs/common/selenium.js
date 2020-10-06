const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');

exports.By = By;
exports.until = until;

exports.firefoxDriver = async () =>
  await new Builder().forBrowser('firefox').build();

exports.headlessFirefoxDriver = async () => {
  var options = new firefox.Options();
  options.addArguments('-headless');
  await new Builder()
    .forBrowser('firefox')
    .setFirefoxOptions(options)
    .build();
};

exports.chromeDriver = async () =>
  await new Builder().forBrowser('chrome').build();

exports.specialChromeDriver = async () => {
  var opts = new chrome.Options();
  opts.addArguments([
    'user-agent="Mozilla/5.0 (iPad; CPU OS 13_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/86.0.4240.80 Mobile/15E148 Safari/604.1"'
  ]);

  await new Builder().withCapabilities(opts.toCapabilities()).build();
};

exports.safariDriver = async () =>
  await new Builder().forBrowser('safari').build();
