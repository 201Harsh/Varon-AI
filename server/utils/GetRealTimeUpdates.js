import axios from "axios";

/**
 * @param {string} location
 * @returns {Promise<{lat: number, lon: number, name: string}>}
 */
async function getCoordinates(location) {
  try {
    const url = "https://nominatim.openstreetmap.org/search";
    const response = await axios.get(url, {
      params: {
        q: location,
        format: "json",
        limit: 1,
      },
      headers: {
        "User-Agent": "ChronosWeatherTool/1.0",
      },
    });

    if (!response.data || response.data.length === 0) {
      throw new Error(`Location "${location}" not found.`);
    }

    return {
      lat: response.data[0].lat,
      lon: response.data[0].lon,
      name: response.data[0].display_name,
    };
  } catch (error) {
    throw new Error(`Geocoding failed: ${error.message}`);
  }
}

async function getWeather(lat, lon) {
  try {
    const url = "https://api.open-meteo.com/v1/forecast";
    const response = await axios.get(url, {
      params: {
        latitude: lat,
        longitude: lon,
        current:
          "temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m",
        daily: "temperature_2m_max,temperature_2m_min",
        timezone: "auto",
      },
    });

    const current = response.data.current;
    const daily = response.data.daily;

    const weatherCodes = {
      0: "Clear sky ☀️",
      1: "Mainly clear 🌤",
      2: "Partly cloudy ⛅",
      3: "Overcast ☁️",
      45: "Fog 🌫",
      51: "Drizzle 淅",
      61: "Rain 🌧",
      71: "Snow ❄️",
      95: "Thunderstorm ⚡",
    };

    return {
      temperature: `${current.temperature_2m}°C`,
      condition: weatherCodes[current.weather_code] || "Unknown",
      humidity: `${current.relative_humidity_2m}%`,
      wind: `${current.wind_speed_10m} km/h`,
      high: `${daily.temperature_2m_max[0]}°C`,
      low: `${daily.temperature_2m_min[0]}°C`,
    };
  } catch (error) {
    throw new Error(`Weather API failed: ${error.message}`);
  }
}

async function getTime(lat, lon) {
  try {
    const url = "https://api.open-meteo.com/v1/forecast";
    const response = await axios.get(url, {
      params: {
        latitude: lat,
        longitude: lon,
        current: "is_day",
        timezone: "auto",
      },
    });

    const timezone = response.data.timezone;

    const now = new Date();
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      weekday: "long",
      timeZoneName: "short",
    });

    return {
      time: formatter.format(now),
      timezone: timezone,
    };
  } catch (error) {
    throw new Error(`Time API failed: ${error.message}`);
  }
}
export async function getRealTimeData(location) {
  try {
    const coords = await getCoordinates(location);

    const [weather, timeData] = await Promise.all([
      getWeather(coords.lat, coords.lon),
      getTime(coords.lat, coords.lon),
    ]);

    return {
      location: coords.name,
      ...weather,
      ...timeData,
    };
  } catch (error) {
    throw error;
  }
}
