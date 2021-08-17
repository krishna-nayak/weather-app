const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const fetch = require("node-fetch");
// const { request, response } = require("express");

const app = express();

async function getData(cityName) {
  const API_key = "06e37de5c4e8acab1d3cbc938a401688";
  const unit = "metric";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_key}&units=${unit}`;
  console.log(url);
  // Data fetch
  const weather = await fetch(url);
  const weatherJSON = await weather.json();
  return weatherJSON;
}
let cityName = "";

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", homeCtr);

app.post(
  "/",
  function (request, response, next) {
    let previousData = cityName;
    request.data = request.body.location != "" ? request.body.location.trim() : previousData;
    return next();
  },
  homeCtr
);

app.listen(3000, () => {
  console.log("Server Start on localhost:3000");
});

async function homeCtr(request, response) {
  console.log(request.data);
  if (request.data === undefined) cityName = "delhi";
  else cityName = request.data;

  console.log(request.data);
  let data = await getData(cityName);
  try {
    response.render("index", { cityName: data.name, description: data.weather[0].description, temp: data.main.temp, icon: data.weather[0].icon });
  } catch (error) {
    // console.error(error);
    response.render("index", { cityName: cityName, description: data.message, temp: "?", icon: "none" });
  }
}
