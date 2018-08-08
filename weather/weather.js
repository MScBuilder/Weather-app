const request = require('request');

const currentWeather = (latitude, longitude, callback) => {
  request({
    url: `https://api.darksky.net/forecast/5f7a2c3b5c552513b2c986df723b0d6e/${latitude},${longitude}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('Unable to reach Forecast.io servers');
    } else if (body.code === 400) {
      callback(body.error);
    } else if (body.latitude) {
      callback(undefined, {
        weather_summary: body.currently.summary,
        temperature: body.currently.temperature,
        apparent_temperature: body.currently.apparentTemperature,
        pressure: body.currently.pressure,
        humidity: body.currently.humidity,
      })
    } else {
      console.log('Please, check if your request was correct!')
    };
  });
};

module.exports.currentWeather = currentWeather;
