const request = require("request");

const getForecast = (long, lat, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=62c5028c11ef14fb9f1458ff7ce5ab79&query=${long},${lat}`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Problems with connection", undefined);
    } else if (body.error) {
      callback("No found object", undefined);
    } else {
      callback(
        undefined,
        `!!!!!   ${body.current.temperature} degrees ABOVE ZERO`
      );
    }
  });
};

module.exports = getForecast;
