const fetch = require('node-fetch');
var request = require('request');

var options = {
  method: 'GET',
  url: 'http://api.openweathermap.org/data/2.5/weather',
  qs: {
    q: 'Johannesburg,%20ZA',
    appid: '127f5f352fb76f1fe4f6dbf8f5afdbca',
    units: 'metric'
  },
  headers: {
    'cache-control': 'no-cache',
    Connection: 'keep-alive',
    'Accept-Encoding': 'gzip, deflate',
    Host: 'api.openweathermap.org',
    'Postman-Token':
      'e3899193-388b-4e64-9d96-d1037f50622b,12a8ef49-fc0f-4da0-b3cf-40f3799f74c0',
    'Cache-Control': 'no-cache',
    Accept: '*/*',
    'User-Agent': 'PostmanRuntime/7.15.2'
  }
};

request(options, function(error, response, body) {
  if (error) throw new Error(error);

  console.log('request:', body);
});

const fetchURL = 'http://api.openweathermap.org/data/2.5/weather';
const url = new URL(fetchURL),
  params = {
    q: 'Johannesburg,%20ZA',
    appid: '127f5f352fb76f1fe4f6dbf8f5afdbca',
    units: 'metric'
  };

console.log(url.searchParams);
Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
console.log(url.searchParams);

const makeRequest = async () => {
  console.log('making request');
  const result = await fetch(url);
  const jsonResult = await result.json();
  console.log('got response', jsonResult);
};
makeRequest();
