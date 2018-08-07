const request = require('request');

const geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
      let encodedAddress = encodeURIComponent(address);
      request({
          url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyDrVqk_N8cQl8P6Xdkcj1ve-6kTHEUoAK4`,
      }, (error, response, body) => {
          if (error) {
              reject('Unable to connect to google servers.');
          } else if (body.status === 'ZERO_RESULTS') {
              reject('Unable to find that address');
          } else if (body.status === 'OVER_QUERY_LIMIT'){
              reject('You reach max query limit in Google geocode API');
          } else if (body.status === 'OK') {
              resolve({
                  address: body.results[0].formatted_address,
                  latitude: body.results[0].geometry.location.lat,
                  longitude: body.results[0].geometry.location.lng
              });
          } else {
              reject('Somethings goes wrong!\nPlease, check if you use correct option');
          }
      });
    });
}

module.exports.geocodeAddress = geocodeAddress;
