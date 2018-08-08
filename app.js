const yargs = require('yargs');
const fs = require('fs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
    .command(['default [address]', 'd', 'def'], 'Set used addres as default', {}, (argv) => {
      fs.writeFileSync('defaultAddress.txt', argv.address);
      console.log('You use defaultAddress command!');
    })
    .options({
        a: {
            demand: false,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        },
        d: {
          demand: false,
          alias: 'defaultAddress',
          describe: 'Setting your default address',
          string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

let addressToFetch = argv.address;

if (argv.address === undefined) {
  addressToFetch = fs.readFileSync('defaultAddress.txt');
}

geocode.geocodeAddress(addressToFetch).then((location) => {
  console.log (JSON.stringify(location, undefined, 2));
  weather.currentWeather(location.latitude, location.longitude, (errorMessage, weatherResults) => {
    if (errorMessage) {
        console.log (errorMessage);
    } else {
        console.log (JSON.stringify(weatherResults, undefined, 2));
    }
  });
}).catch((errorMessage) => {
  console.log(errorMessage);
});
