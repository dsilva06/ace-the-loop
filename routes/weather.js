const router = require("express").Router();
const axios = require("axios");

router.get("/forecast", (req, res) => {
  axios
    .get(
      "http://api.weatherapi.com/v1/current.json?key=779fa2ca6d314829b63205427221402&q=valencia&aqi=no"
    )
    .then((results) => {
    res.render("weather/forecast", results.data)
    console.log(results)
    })
    .catch((err) => {
      console.log("sorry we are having an error", err);
    });
});

module.exports = router;
