const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const fetch = require("node-fetch");

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

let cityName = "delhi";

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (request, response) => {
  let data = await getData(cityName);
  response.render("index", { cityName: data.name, description: data.weather[0].description, temp: data.main.temp });
});

app.post("/", async function (request, response) {
  let previousData = cityName;
  cityName = request.body.location != "" ? request.body.location : previousData;

  response.redirect("/");
});

app.listen(3000, () => {
  console.log("Server Start on localhost:3000");
});
