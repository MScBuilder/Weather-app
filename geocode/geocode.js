const request = require('request');

const geocodeAddress = (address, callback) => {
    let encodedAddress = encodeURIComponent(address);
    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyDrVqk_N8cQl8P6Xdkcj1ve-6kTHEUoAK4`,
          // url: `https://maps.googleapis.com/maps/api/geocode/json?address=19146`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connecto to google servers.');
        } else if (body.status === 'ZERO_RESULTS') {
            callback('Unable to find that address');
        } else if (body.status === 'OVER_QUERY_LIMIT'){
            callback('You reach max query limit in Google geocde API');
        } else if (body.status === 'OK') {
            callback(undefined, {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            });
        } else {
            console.log('Somethings goes wrong!\nPlease, check if you use correct option');
        }
    });
}

module.exports.geocodeAddress = geocodeAddress;
