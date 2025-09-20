const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const API_KEY = process.env.OPEN_WEATHER_API_KEY;
console.log(API_KEY);
console.log(PORT);

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://precisely-weather-client.onrender.com",
    ],
  })
);

app.get("/weather", async (req, res) => {
  const { long, lat } = req.query;
  if (!long || !lat) {
    return res.status(400).json({
      success: false,
      message:
        "longitude and latitute are required for determinig your location.",
    });
  }
  try {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${lat},${long}&day=1`;
    const response = await fetch(url);
    const weatherData = await response.json();
    if (weatherData.error) {
      return res
        .status(400)
        .json({ success: false, message: weatherData.error.message });
    }
    return res.status(200).json(weatherData);
  } catch (error) {
    console.log(error);
  }
});

app.get("/searchCities", async (req, res) => {
  const { city } = req.query;
  try {
    const data = await fetch(
      `http://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${city}`
    );
    const cities = await data.json();
    return res.status(200).json(cities);
  } catch (error) {
    console.log(error);
  }
});
app.listen(PORT, () => {
  console.log("server started");
});
