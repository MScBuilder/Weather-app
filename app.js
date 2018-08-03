const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weatherForecast = require('./weatherForecast/weather');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

geocode.geocodeAddress (argv.address, (errorMessage, results) => {
    if (errorMessage) {
        console.log (errorMessage);
    } else {
        console.log(JSON.stringify(results, undefined, 2));
        weatherForecast.currentWeather (results.latitude, results.longitude, (errorMess, weather) => {
            if (errorMess) {
                console.log (errorMess);
            } else {
                console.log(JSON.stringify(weather, undefined, 2));
            }
        });
    }
})
