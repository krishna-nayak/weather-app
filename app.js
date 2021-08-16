const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (request, response) => {
  response.render("index");
});

app.post("/", (request, response) => {
  response.redirect("/");
});

app.listen(3000, () => {
  console.log("Server Start on localhost:3000");
});
