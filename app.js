const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
let cityName = "";
const port = process.env.PORT || 3000;
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", homeCtr);

app.post("/", postFunction, homeCtr);

app.listen(port, () => {
  console.log(`Server Start on http://localhost:${port}`);
});

// Route Function
async function homeCtr(request, response) {
  if (request.data === undefined) cityName = "mumbai";
  else cityName = request.data;
  let data = await getData(cityName);
  try {
    response.render("index", { cityName: data.name, description: data.weather[0].description, temp: data.main.temp, icon: data.weather[0].icon });
  } catch (error) {
    response.render("index", { cityName: cityName, description: data.message, temp: "?", icon: "none" });
  }
}

function postFunction(request, response, next) {
  let previousData = cityName;
  request.data = request.body.location != "" ? request.body.location.trim() : previousData;
  return next();
}

async function getData(cityName) {
  const API_key = process.env.API_KEY;
  const unit = "metric";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_key}&units=${unit}`;
  // Data fetch
  const weather = await fetch(url);
  const weatherJSON = await weather.json();
  return weatherJSON;
}
