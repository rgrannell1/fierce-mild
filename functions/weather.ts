// functions/weather.ts
import { OpenWeatherAPI } from "./src/open-weather-api.ts";
import * as Weather from "./src/classifier.ts";
import {
  Context,
  Handler,
  HandlerEvent,
  NetlifyFunction,
} from "@netlify/functions";

// Ensure API key is present
const API_KEY = process.env.OPEN_WEATHER_API_KEY;
if (!API_KEY) {
  throw new Error("No API key found; please provide 'OPEN_WEATHER_API_KEY'");
}

const handler: Handler = async (event: HandlerEvent, context: Context) => {
  const api = new OpenWeatherAPI(API_KEY);

  try {
    const res = await api.getWeather(0, 0);
    const message = Weather.classify(res);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message,
      }),
    };
  } catch (err) {
    console.error(err);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Not a notion",
      }),
    };
  }
};

export { handler };
