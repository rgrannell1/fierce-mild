import type { WeatherResponse } from "./types.ts";

export class OpenWeatherAPI {
  private apiKey: string;
  private apiUrl = "https://api.openweathermap.org/data/2.5/weather";

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async getWeather(lat: number, lon: number): Promise<WeatherResponse> {
    const url = `${this.apiUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}`;

    try {
      const response = await fetch(url);
      return await response.json();
    } catch (err) {
      throw new Error("Error getting weather data", { error: err });
    }
  }
}
