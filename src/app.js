const path = require("path");
const express = require("express");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const hbs = require("hbs");

const app = express();
const port = process.env.PORT || 3000;

const publicDirPath = path.join(__dirname, "../public");

const viewsPath = path.join(__dirname, "../templates/views");

const partialPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
app.use(express.static(publicDirPath));
hbs.registerPartials(partialPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Dmitri",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "This is a help page...",
    title: "My help title",
    name: "My HBS name",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Dmitri",
  });
});
app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide products",
    });
  }
  res.send({
    products: [],
    temperature: 18,
    forecast: "snowing",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "No location provided",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "No help page found 404",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    title: "Page not found 404",
  });
});

app.listen(port, () => {
  console.log(`Started server on port ${port}`);
});
