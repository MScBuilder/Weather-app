const request = require('request');

const getWeather = (latitude, longitude, callback) => {
    request({
        url: `https://api.darksky.net/forecast/410195dee1526141ace054df68889c32/${latitude},${longitude}?exlude=minutely,hourly,daily,alerts,flags&lang=pl&units=auto`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to Forecast.io servers');
        } else if (body.code === 400) {
            callback(body.error);
        } else if (body.longitude){
            callback(undefined, {
                current_weather: body.currently.summary,
                temperature: body.currently.temperature,
                apparent_temperature: body.currently.apparentTemperature,
                humidity: body.currently.humidity,
                pressure: body.currently.pressure,
                wind_speed: body.currently.windSpeed
            });
        } else {
            console.log('Somethings goes wrong!\nPlease, check if you use correct option');  
        }
    });
}; 

module.exports.getWeather = getWeather;