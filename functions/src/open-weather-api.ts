import type { WeatherResponse } from "./types.ts";
import fetch from "node-fetch";

export class OpenWeatherAPI {
  private apiKey: string;
  private apiUrl = "https://api.openweathermap.org/data/2.5/weather";

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  /*
   * In case the rascals try to inject parameters etc.
   */
  checkUserInput(lat: number, lon: number) {
    if (typeof lat !== "number" || typeof lon !== "number") {
      throw new Error("Invalid input");
    }

    if (lat < -90 || lat > 90) {
      throw new Error(`Invalid latitude: ${lat}`);
    }

    if (lon < -180 || lon > 180) {
      throw new Error(`Invalid longitude: ${lon}`);
    }
  }

  async getWeather(lat: number, lon: number): Promise<WeatherResponse> {
    this.checkUserInput(lat, lon);

    const url = `${this.apiUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}`;

    try {
      const response = await fetch(url);
      return await response.json();
    } catch (err) {
      throw new Error("Error getting weather data", { cause: err });
    }
  }
}
