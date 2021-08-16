const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const fetch = require("node-fetch");

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (request, response) => {
  response.render("index");
});

app.post("/", async function (request, response) {
  const cityName = request.body.location;

  const API_key = "06e37de5c4e8acab1d3cbc938a401688";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_key}`;

  // Data fetch
  const weather = await fetch(url);
  const weatherData = await weather.json();

  console.log(weatherData);

  response.redirect("/");
});

app.listen(3000, () => {
  console.log("Server Start on localhost:3000");
});
