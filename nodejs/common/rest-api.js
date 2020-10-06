const fetch = require('node-fetch');
const request = require('request');

exports.usingRequest = () => {
  console.log('making a request');
  const options = {
    method: 'GET',
    url: 'http://api.openweathermap.org/data/2.5/weather',
    qs: {
      q: 'Johannesburg,%20ZA',
      appid: '',
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
    if (error) {
      throw new Error(error);
      return '';
    }
    console.log('request:', body);
    return body;
  });
};
const result = this.usingRequest();
console.log('Got this', result);
exports.usingFetch = async () => {
  // To get the current weather
  const fetchURL = 'http://api.openweathermap.org/data/2.5/weather';
  const url = new URL(fetchURL),
    params = {
      q: 'Johannesburg,%20ZA',
      appid: '',
      units: 'metric'
    };

  console.log(url.searchParams);
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  console.log(url.searchParams);

  console.log('making request');
  const result = await fetch(url);
  const jsonResult = await result.json();
  console.log('got response', jsonResult);
};
// usingFetch();
