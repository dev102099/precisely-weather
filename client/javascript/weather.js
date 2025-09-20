import { updateProgressBar } from "./progressbar.js";

let latitude = 0;
let longitude = 0;
let data = "";
let city = null;
const weatherMappings = {
  1000: {
    day: "Sunny",
    night: "Clear",
    icon: ["../public/icons/clear-day.svg", "../public/icons/clear-night.svg"],
    bg: "../public/clear-sky.mp4",
  },
  1003: {
    day: "Partly cloudy",
    night: "Partly cloudy",
    icon: [
      "../public/icons/partly-cloudy-day.svg",
      "../public/icons/partly-cloudy-night.svg",
    ],
    bg: "../public/cloudy.mp4",
  },
  1006: {
    day: "Cloudy",
    night: "Cloudy",
    icon: ["../public/icons/cloudy.svg", "../public/icons/cloudy.svg"],
    bg: "../public/cloudy.mp4",
  },
  1009: {
    day: "Overcast",
    night: "Overcast",
    icon: [
      "../public/icons/overcast-day.svg",
      "../public/icons/overcast-night.svg",
    ],
    bg: "../public/cloudy.mp4",
  },
  1030: {
    day: "Mist",
    night: "Mist",
    icon: ["../public/icons/mist.svg", "../public/icons/mist.svg"],
    bg: "../public/fog.mp4",
  },
  1063: {
    day: "Patchy rain possible",
    night: "Patchy rain possible",
    icon: ["../public/icons/rain.svg", "../public/icons/rain.svg"],
    bg: "../public/rain.mp4",
  },
  1066: {
    day: "Patchy snow possible",
    night: "Patchy snow possible",
    icon: ["../public/icons/snow.svg", "../public/icons/snow.svg"],
    bg: "../public/snow.mp4",
  },
  1069: {
    day: "Patchy sleet possible",
    night: "Patchy sleet possible",
    icon: ["../public/icons/sleet.svg", "../public/icons/sleet.svg"],
    bg: "../public/snow.mp4",
  },
  1072: {
    day: "Patchy freezing drizzle possible",
    night: "Patchy freezing drizzle possible",
    icon: ["../public/icons/drizzle.svg", "../public/icons/drizzle.svg"],
    bg: "../public/drizzle.mp4",
  },
  1087: {
    day: "Thundery outbreaks possible",
    night: "Thundery outbreaks possible",
    icon: [
      "../public/icons/thunderstorms.svg",
      "../public/icons/thunderstorms.svg",
    ],
    bg: "../public/thunderstorm.mp4",
  },
  1114: {
    day: "Blowing snow",
    night: "Blowing snow",
    icon: ["../public/icons/snow.svg", "../public/icons/snow.svg"],
    bg: "../public/snow.mp4",
  },
  1117: {
    day: "Blizzard",
    night: "Blizzard",
    icon: ["../public/icons/snow.svg", "../public/icons/snow.svg"],
    bg: "../public/snow.mp4",
  },
  1135: {
    day: "Fog",
    night: "Fog",
    icon: ["../public/icons/fog-day.svg", "../public/icons/fog-night.svg"],
    bg: "../public/fog.mp4",
  },
  1147: {
    day: "Freezing fog",
    night: "Freezing fog",
    icon: ["../public/icons/fog-day.svg", "../public/icons/fog-night.svg"],
    bg: "../public/fog.mp4",
  },
  1150: {
    day: "Patchy light drizzle",
    night: "Patchy light drizzle",
    icon: ["../public/icons/drizzle.svg", "../public/icons/drizzle.svg"],
    bg: "../public/drizzle.mp4",
  },
  1153: {
    day: "Light drizzle",
    night: "Light drizzle",
    icon: ["../public/icons/drizzle.svg", "../public/icons/drizzle.svg"],
    bg: "../public/drizzle.mp4",
  },
  1168: {
    day: "Freezing drizzle",
    night: "Freezing drizzle",
    icon: ["../public/icons/drizzle.svg", "../public/icons/drizzle.svg"],
    bg: "../public/drizzle.mp4",
  },
  1171: {
    day: "Heavy freezing drizzle",
    night: "Heavy freezing drizzle",
    icon: ["../public/icons/drizzle.svg", "../public/icons/drizzle.svg"],
    bg: "../public/drizzle.mp4",
  },
  1180: {
    day: "Patchy light rain",
    night: "Patchy light rain",
    icon: ["../public/icons/rain.svg", "../public/icons/rain.svg"],
    bg: "../public/rain.mp4",
  },
  1183: {
    day: "Light rain",
    night: "Light rain",
    icon: ["../public/icons/rain.svg", "../public/icons/rain.svg"],
    bg: "../public/rain.mp4",
  },
  1186: {
    day: "Moderate rain at times",
    night: "Moderate rain at times",
    icon: ["../public/icons/rain.svg", "../public/icons/rain.svg"],
    bg: "../public/rain.mp4",
  },
  1189: {
    day: "Moderate rain",
    night: "Moderate rain",
    icon: ["../public/icons/rain.svg", "../public/icons/rain.svg"],
    bg: "../public/rain.mp4",
  },
  1192: {
    day: "Heavy rain at times",
    night: "Heavy rain at times",
    icon: ["../public/icons/rain.svg", "../public/icons/rain.svg"],
    bg: "../public/rain.mp4",
  },
  1195: {
    day: "Heavy rain",
    night: "Heavy rain",
    icon: ["../public/icons/rain.svg", "../public/icons/rain.svg"],
    bg: "../public/rain.mp4",
  },
  1198: {
    day: "Light freezing rain",
    night: "Light freezing rain",
    icon: ["../public/icons/rain.svg", "../public/icons/rain.svg"],
    bg: "../public/rain.mp4",
  },
  1201: {
    day: "Moderate or heavy freezing rain",
    night: "Moderate or heavy freezing rain",
    icon: ["../public/icons/rain.svg", "../public/icons/rain.svg"],
    bg: "../public/rain.mp4",
  },
  1204: {
    day: "Light sleet",
    night: "Light sleet",
    icon: ["../public/icons/sleet.svg", "../public/icons/sleet.svg"],
    bg: "../public/snow.mp4",
  },
  1207: {
    day: "Moderate or heavy sleet",
    night: "Moderate or heavy sleet",
    icon: ["../public/icons/sleet.svg", "../public/icons/sleet.svg"],
    bg: "../public/snow.mp4",
  },
  1210: {
    day: "Patchy light snow",
    night: "Patchy light snow",
    icon: ["../public/icons/snow.svg", "../public/icons/snow.svg"],
    bg: "../public/snow.mp4",
  },
  1213: {
    day: "Light snow",
    night: "Light snow",
    icon: ["../public/icons/snow.svg", "../public/icons/snow.svg"],
    bg: "../public/snow.mp4",
  },
  1216: {
    day: "Patchy moderate snow",
    night: "Patchy moderate snow",
    icon: ["../public/icons/snow.svg", "../public/icons/snow.svg"],
    bg: "../public/snow.mp4",
  },
  1219: {
    day: "Moderate snow",
    night: "Moderate snow",
    icon: ["../public/icons/snow.svg", "../public/icons/snow.svg"],
    bg: "../public/snow.mp4",
  },
  1222: {
    day: "Patchy heavy snow",
    night: "Patchy heavy snow",
    icon: ["../public/icons/snow.svg", "../public/icons/snow.svg"],
    bg: "../public/snow.mp4",
  },
  1225: {
    day: "Heavy snow",
    night: "Heavy snow",
    icon: ["../public/icons/snow.svg", "../public/icons/snow.svg"],
    bg: "../public/snow.mp4",
  },
  1237: {
    day: "Ice pellets",
    night: "Ice pellets",
    icon: ["../public/icons/hail.svg", "../public/icons/hail.svg"],
    bg: "../public/snow.mp4",
  },
  1240: {
    day: "Light rain shower",
    night: "Light rain shower",
    icon: ["../public/icons/rain.svg", "../public/icons/rain.svg"],
    bg: "../public/rain.mp4",
  },
  1243: {
    day: "Moderate or heavy rain shower",
    night: "Moderate or heavy rain shower",
    icon: ["../public/icons/rain.svg", "../public/icons/rain.svg"],
    bg: "../public/rain.mp4",
  },
  1246: {
    day: "Torrential rain shower",
    night: "Torrential rain shower",
    icon: ["../public/icons/rain.svg", "../public/icons/rain.svg"],
    bg: "../public/rain.mp4",
  },
  1249: {
    day: "Light sleet showers",
    night: "Light sleet showers",
    icon: ["../public/icons/sleet.svg", "../public/icons/sleet.svg"],
    bg: "../public/snow.mp4",
  },
  1252: {
    day: "Moderate or heavy sleet showers",
    night: "Moderate or heavy sleet showers",
    icon: ["../public/icons/sleet.svg", "../public/icons/sleet.svg"],
    bg: "../public/snow.mp4",
  },
  1255: {
    day: "Light snow showers",
    night: "Light snow showers",
    icon: ["../public/icons/snow.svg", "../public/icons/snow.svg"],
    bg: "../public/snow.mp4",
  },
  1258: {
    day: "Moderate or heavy snow showers",
    night: "Moderate or heavy snow showers",
    icon: ["../public/icons/snow.svg", "../public/icons/snow.svg"],
    bg: "../public/snow.mp4",
  },
  1261: {
    day: "Light showers of ice pellets",
    night: "Light showers of ice pellets",
    icon: ["../public/icons/hail.svg", "../public/icons/hail.svg"],
    bg: "../public/snow.mp4",
  },
  1264: {
    day: "Moderate or heavy showers of ice pellets",
    night: "Moderate or heavy showers of ice pellets",
    icon: ["../public/icons/hail.svg", "../public/icons/hail.svg"],
    bg: "../public/snow.mp4",
  },
  1273: {
    day: "Patchy light rain with thunder",
    night: "Patchy light rain with thunder",
    icon: [
      "../public/icons/thunderstorms-day-rain.svg",
      "../public/icons/thunderstorms-night-rain.svg",
    ],
    bg: "../public/thunderstorm.mp4",
  },
  1276: {
    day: "Moderate or heavy rain with thunder",
    night: "Moderate or heavy rain with thunder",
    icon: [
      "../public/icons/thunderstorms-day-rain.svg",
      "../public/icons/thunderstorms-night-rain.svg",
    ],
    bg: "../public/thunderstorm.mp4",
  },
  1279: {
    day: "Patchy light snow with thunder",
    night: "Patchy light snow with thunder",
    icon: [
      "../public/icons/thunderstorms-day-snow.svg",
      "../public/icons/thunderstorms-night-sbow.svg",
    ],
    bg: "../public/thunderstorm.mp4",
  },
  1282: {
    day: "Moderate or heavy snow with thunder",
    night: "Moderate or heavy snow with thunder",
    icon: [
      "../public/icons/thunderstorms-day-snow.svg",
      "../public/icons/thunderstorms-night-sbow.svg",
    ],
    bg: "../public/thunderstorm.mp4",
  },
};

const uvMappings = {
  0: {
    desc: "No protection needed. You can safely stay outside using minimal sun protection.",
    type: "Low",
    icon: "../public/icons/uv-index-0.svg",
  },
  1: {
    desc: "No protection needed. You can safely stay outside using minimal sun protection.",
    type: "Low",
    icon: "../public/icons/uv-index-1.svg",
  },
  2: {
    desc: "No protection needed. You can safely stay outside using minimal sun protection.",
    type: "Low",
    icon: "../public/icons/uv-index-2.svg",
  },
  3: {
    desc: "Protection needed. Seek shade during the late morning through mid-afternoon. Apply sunscreen.",
    type: "Moderate",
    icon: "../public/icons/uv-index-3.svg",
  },
  4: {
    desc: "Protection needed. Seek shade during the late morning through mid-afternoon. Apply sunscreen.",
    type: "Moderate",
    icon: "../public/icons/uv-index-4.svg",
  },
  5: {
    desc: "Protection needed. Seek shade during the late morning through mid-afternoon. Apply sunscreen.",
    type: "Moderate",
    icon: "../public/icons/uv-index-5.svg",
  },
  6: {
    desc: "Extra protection needed. Protection against sun damage is needed. Wear a wide-brimmed hat and sunglasses and apply sunscreen.",
    type: "High",
    icon: "../public/icons/uv-index-6.svg",
  },
  7: {
    desc: "Extra protection needed. Protection against sun damage is needed. Wear a wide-brimmed hat and sunglasses and apply sunscreen.",
    type: "High",
    icon: "../public/icons/uv-index-7.svg",
  },
  8: {
    desc: "Stay inside. Take extra precautions as unprotected skin will be damaged and can burn quickly. Avoid the sun between 10 a.m. and 4 p.m.",
    type: "Very High",
    icon: "../public/icons/uv-index-8.svg",
  },
  9: {
    desc: "Stay inside. Take extra precautions as unprotected skin will be damaged and can burn quickly. Avoid the sun between 10 a.m. and 4 p.m.",
    type: "Very High",
    icon: "../public/icons/uv-index-9.svg",
  },
  10: {
    desc: "Stay inside. Take extra precautions as unprotected skin will be damaged and can burn quickly. Avoid the sun between 10 a.m. and 4 p.m.",
    type: "Very High",
    icon: "../public/icons/uv-index-10.svg",
  },
  11: {
    desc: "Stay inside! Take all precautions. Unprotected skin can burn in minutes.",
    type: "Extream",
    icon: "../public/icons/uv-index-11.svg",
  },
  "11+": {
    desc: "Stay inside! The UV index is off the charts. Maximum protection required.",
    type: "Extreme",
    icon: "../public/icons/uv-index-11+.svg", // can reuse 11’s icon
  },
};

function getUVData(uv) {
  if (uv >= 11) {
    return uvMappings["11+"];
  }
  return uvMappings[uv] || uvMappings[0];
}

function getWindInfo(mph) {
  const beaufortScale = [
    {
      level: 0,
      desc: "Calm",
      range: [0, 1], // 0.0 - 0.9
      icon: "../public/icons/wind-beaufort-0.svg",
    },
    {
      level: 1,
      desc: "Light Air",
      range: [1, 4], // 1.0 - 3.9
      icon: "../public/icons/wind-beaufort-1.svg",
    },
    {
      level: 2,
      desc: "Light Breeze",
      range: [4, 8], // 4.0 - 7.9
      icon: "../public/icons/wind-beaufort-2.svg",
    },
    {
      level: 3,
      desc: "Gentle Breeze",
      range: [8, 13], // 8.0 - 12.9
      icon: "../public/icons/wind-beaufort-3.svg",
    },
    {
      level: 4,
      desc: "Moderate Breeze",
      range: [13, 19], // 13.0 - 18.9
      icon: "../public/icons/wind-beaufort-4.svg",
    },
    {
      level: 5,
      desc: "Fresh Breeze",
      range: [19, 25], // 19.0 - 24.9
      icon: "../public/icons/wind-beaufort-5.svg",
    },
    {
      level: 6,
      desc: "Strong Breeze",
      range: [25, 32], // 25.0 - 31.9
      icon: "../public/icons/wind-beaufort-6.svg",
    },
    {
      level: 7,
      desc: "Near Gale",
      range: [32, 39], // 32.0 - 38.9
      icon: "../public/icons/wind-beaufort-7.svg",
    },
    {
      level: 8,
      desc: "Gale",
      range: [39, 47], // 39.0 - 46.9
      icon: "../public/icons/wind-beaufort-8.svg",
    },
    {
      level: 9,
      desc: "Strong Gale",
      range: [47, 55], // 47.0 - 54.9
      icon: "../public/icons/wind-beaufort-9.svg",
    },
    {
      level: 10,
      desc: "Storm",
      range: [55, 64], // 55.0 - 63.9
      icon: "../public/icons/wind-beaufort-10.svg",
    },
    {
      level: 11,
      desc: "Violent Storm",
      range: [64, 73], // 64.0 - 72.9
      icon: "../public/icons/wind-beaufort-11.svg",
    },
    {
      level: 12,
      desc: "Hurricane Force",
      range: [73, Infinity], // 73+
      icon: "../public/icons/wind-beaufort-12.svg",
    },
  ];

  return (
    beaufortScale.find(
      (scale) => mph >= scale.range[0] && mph < scale.range[1]
    ) || {
      desc: "Unknown",
      icon: "../public/icons/default-wind.svg",
    }
  );
}

const setWeatherInfo = async (latitude, longitude) => {
  try {
    const res = await fetch(
      `http://localhost:3001/apiCall?lat=${latitude}&long=${longitude}`
    );
    data = await res.json();
    if (data.success === false) {
      return alert(data.message);
    }
  } catch (error) {
    alert(error.message);
  }
  const temperature = document.getElementById("temperature");
  temperature.textContent = data.current.temp_c;

  const highLow = document.getElementById("high-low");
  highLow.textContent = `H:${data.forecast.forecastday[0].day.maxtemp_c} | L:${data.forecast.forecastday[0].day.mintemp_c}`;
  const weatherCon = document.getElementById("weather-condition");
  weatherCon.textContent = data.current.condition.text;
  const weatherIcon = document.getElementById("weather-icon");
  weatherIcon.src = data.current.is_day
    ? weatherMappings[data.current.condition.code].icon[0]
    : weatherMappings[data.current.condition.code].icon[1];
  const heroVideo = document.getElementById("hero-video");
  heroVideo.src = weatherMappings[data.current.condition.code].bg;

  const container = document.getElementById("cards");
  data.forecast.forecastday[0].hour.map((item, index) => {
    const temp = item.temp_c;
    const code = item.condition.code;
    const isDay = item.is_day;
    let src;
    src = isDay ? weatherMappings[code].icon[0] : weatherMappings[code].icon[1];
    const time = new Date(item.time);
    let hours = time.getHours();
    let minutes = time.getMinutes();

    if (minutes < 10) minutes = "0" + minutes;

    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    const card = document.createElement("div");
    card.style.width = "fit-content";
    card.innerHTML = `<span style="width:fit-content">${hours}:${minutes} ${ampm}</span>
     <img src=${src} height='40' width = '40' />
     <span>${temp}°C</span>`;
    container.appendChild(card);
  });
  const uvInfo = getUVData(Math.round(data.current.uv));

  const uvImage = document.getElementById("uv-image");
  uvImage.src = uvInfo.icon;
  const uvType = document.getElementById("uv-type");
  const humidityPercentage = document.getElementById("humidity-percentage");
  humidityPercentage.textContent = `${data.current.humidity}%`;

  uvType.textContent = uvInfo.type;
  updateProgressBar(data.current.humidity);
  const precipitation = document.getElementById("expected-precipitation");
  precipitation.textContent = `${data.forecast.forecastday[0].day.totalprecip_mm} mm Expected`;
  const windData = getWindInfo(data.current.wind_mph);
  const windDesc = document.getElementById("wind-desc");
  windDesc.textContent = windData.desc;
  const windIcon = document.getElementById("wind-icon");
  windIcon.src = windData.icon;
  const location = document.getElementById("location");
  location.textContent = `${data.location.name} , ${data.location.country}`;
  const mainContainer = document.getElementById("main-container");
  const skeletonContainer = document.getElementById("skeleton-container");
  skeletonContainer.classList.add("hidden");
  mainContainer.classList.remove("hidden");
};

const onSuccess = async (pos, latitude, longitude) => {
  const crd = pos.coords;
  latitude = crd.latitude;
  longitude = crd.longitude;
  setWeatherInfo(latitude, longitude);
};

const onError = (err) => {
  alert(err.message);
};
async function getLocation() {
  const location = navigator.geolocation.getCurrentPosition(
    onSuccess,
    onError,
    { enableHighAccuracy: true }
  );
}

getLocation();

document.getElementById("search-input").addEventListener("input", async (e) => {
  const city = e.target.value;
  const res = await fetch(`http://localhost:3001/searchCities?city=${city}`);
  const data = await res.json();
  const search = document.getElementById("search-results");
  search.classList.remove("hidden");
  search.innerHTML = "";
  if (city.length == 0) {
    search.classList.add("hidden");
    return;
  }
  data.map((item) => {
    const city = item.name;
    const country = item.country;
    const searchCard = document.createElement("div");
    searchCard.style =
      "display: flex;flex-direction: row;justify-content: center;align-items: center;padding: 10px;border-bottom: 1px solid rgba(255, 255, 255, 0.306);transition: background-color 0.3s ease;";
    searchCard.onmouseover = () => {
      searchCard.style.backgroundColor = "rgba(157,157,157, 0.8)";
    };
    searchCard.onclick = () => {
      setWeatherInfo(item.lat, item.lon);
    };
    searchCard.onmouseout = () => {
      searchCard.style.backgroundColor = "rgba(157,157,157, 0.246)";
    };
    searchCard.innerHTML = `
      <span id="city-country">${city} , ${country}</span>
      `;
    search.appendChild(searchCard);
  });
});

const current = document.getElementById("location-icon");
current.addEventListener("click", () => {
  getLocation();
});
