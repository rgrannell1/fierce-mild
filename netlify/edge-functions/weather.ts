import { OpenWeatherAPI } from "./src/open-weather-api.ts";
import * as Weather from "./src/classifier.ts";

// Ensure API key is present
const API_KEY = Deno.env.get("OPEN_WEATHER_API_KEY");
if (!API_KEY) {
  throw new Error("No API key found");
}

export const config = {
  path: "/weather",
};

export default async (_: Request) => {
  const api = new OpenWeatherAPI(API_KEY);

  try {
    const res = await api.getWeather(0, 0);
    const message = Weather.classify(res);

    return Response.json({
      message,
    });
  } catch (err) {
    console.error(err);

    return Response.json({
      message: "Not a notion",
    });
  }
};
