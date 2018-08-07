const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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

geocode.geocodeAddress(argv.address).then((location) => {
  console.log (JSON.stringify(location, undefined, 2));
  weather.currentWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
    if (errorMessage) {
        console.log (errorMessage);
    } else {
        console.log (JSON.stringify(weatherResults, undefined, 2));
    }
  });
}).catch((errorMessage) => {
  console.log('errorMessage');
});
