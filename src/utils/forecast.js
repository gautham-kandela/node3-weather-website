const request = require("request");

const url = 'http://api.weatherstack.com/current?access_key=c97d3c9a46e5249ee904eb00eae561be&query=';

const forecast = (long, lat, callback) => {
    const urlFormatted = url + encodeURIComponent(long) + ',' + encodeURIComponent(lat) + '&units=f';
    request({ url: urlFormatted, json: true }, (error, {body}={}) => {
        if(error){
            //console.log('Unable to connect to weather service');
            callback(error, undefined);
        }else if (body.error){
            //console.log('Unable to fetch data');
            callback(body.error, undefined);
        } else {
            //console.log(response.body.current);
            callback(undefined, body.current);
        }
    })
}

module.exports = forecast;