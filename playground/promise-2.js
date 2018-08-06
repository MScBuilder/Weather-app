var request = require('request');

const geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        let encodedAddress = encodeURIComponent(address);
        request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=5f7a2c3b5c552513b2c986df723b0d6e`,
            json: true
        }, (error, response, body) => {
            if (error) {
                reject('Unable to connect to google servers.');
            } else if (body.status === 'ZERO_RESULTS') {
                reject('Unable to find that address');
            } else if (body.status === 'REQUEST_DENIED') {
                reject('Please, check your Forecast.io key');
            } else if (body.status === 'OK') {
                resolve(
                    {
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                });
            } else {
                reject('Somethings goes wrong!\nPlease, check if you use correct option');  
            }
        });
    });    
};

geocodeAddress('Rudnik').then((location) => {
    console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
    console.log(errorMessage);
});