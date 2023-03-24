import { WeatherResponse } from "./types.ts";
import * as Codes from "./codes.ts";

import phrases from "./phrases.ts";
import { Temperature } from "./temperature.ts";

function oneOf(args: string[]) {
  return args[Math.floor(Math.random() * args.length)];
}

function classifyThunderstorm(code: number, temperatureLabel: string) {
  const isVeryRainy = new Set([
    Codes.ThunderstormWithHeavyRain,
    Codes.ThunderstormWithLightRain,
    Codes.ThunderstormWithHeavyDrizzle,
  ]).has(code);

  if (isVeryRainy) {
    return oneOf(phrases.thunderstorm.veryRainy);
  }

  // womp womp
  if (temperatureLabel === Temperature.ARCTIC) {
    return oneOf(phrases.thunderstorm.freezing);
  }

  if (
    temperatureLabel === Temperature.ROASTING ||
    temperatureLabel === Temperature.OVEN
  ) {
    return oneOf(phrases.thunderstorm.hot);
  }

  return oneOf(phrases.thunderstorm.default);
}

function classifyDrizzle(code: number, temperatureLabel: string) {
  if (
    temperatureLabel === Temperature.ROASTING ||
    temperatureLabel === Temperature.OVEN
  ) {
    return oneOf(phrases.drizzle.hot);
  }

  if (
    temperatureLabel === Temperature.BALTIC ||
    temperatureLabel === Temperature.FREEZING
  ) {
    return oneOf(phrases.drizzle.freezing);
  }

  if (
    temperatureLabel === Temperature.CHILLY ||
    temperatureLabel === Temperature.MILD
  ) {
    return oneOf(phrases.drizzle.mild);
  }

  return oneOf(phrases.drizzle.default);
}

function classifyRain(code: number, temperatureLabel: string) {
  if (
    temperatureLabel === Temperature.ROASTING ||
    temperatureLabel === Temperature.OVEN
  ) {
    return oneOf(phrases.rain.hot);
  }

  if (
    temperatureLabel === Temperature.BALTIC ||
    temperatureLabel === Temperature.FREEZING
  ) {
    return oneOf(phrases.rain.freezing);
  }

  if (code === 511) {
    return oneOf([
      "It's raining ice",
    ]);
  }

  const isVeryRainy = new Set([
    501,
    502,
    503,
    504,
  ]);

  if (isVeryRainy) {
    return oneOf(phrases.rain.veryRainy);
  } else {
    return oneOf(phrases.rain.default);
  }
}

function classifySnow(code: number, temperatureLabel: string) {
  if (
    temperatureLabel !== Temperature.BALTIC &&
    temperatureLabel !== Temperature.ARCTIC
  ) {
    return oneOf(phrases.snow.freezing);
  }

  if (
    temperatureLabel === Temperature.HOT ||
    temperatureLabel === Temperature.ROASTING ||
    temperatureLabel === Temperature.OVEN
  ) {
    return oneOf(phrases.snow.hot);
  }

  return oneOf(phrases.snow.default);
}

function classifyAtmosphere(code: number, temperatureLabel: string) {
  if (code === 701 || code === 721) {
    return oneOf(phrases.atmosphere.hazy.default);
  }

  if (code === 741) {
    return oneOf(phrases.atmosphere.foggy.default);
  }
}

function classifyClear(code: number, temperatureLabel: string) {
  if (
    temperatureLabel === Temperature.ROASTING ||
    temperatureLabel === Temperature.OVEN
  ) {
    return oneOf(phrases.clear.hot);
  }

  if (
    temperatureLabel === Temperature.BALTIC ||
    temperatureLabel === Temperature.FREEZING
  ) {
    return oneOf(phrases.clear.freezing);
  }

  return oneOf(phrases.clear.default);
}

function classifyCloudy(code: number, temperatureLabel: string) {
  if (
    temperatureLabel === Temperature.ROASTING ||
    temperatureLabel === Temperature.OVEN
  ) {
    return oneOf(
      phrases.cloudy.hot,
    );
  }

  return oneOf(phrases.cloudy.default);
}

export function classify(weather: WeatherResponse) {
  const [summary] = weather.weather;

  const code = summary.id;
  const temperature = weather.main.temp;

  const temperatureLabel = Temperature.label(temperature);

  // https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2
  if (code >= 200 && code < 300) {
    return classifyThunderstorm(code, temperatureLabel);
  } else if (code >= 300 && code < 400) {
    return classifyDrizzle(code, temperatureLabel);
  } else if (code >= 500 && code < 600) {
    return classifyRain(code, temperatureLabel);
  } else if (code >= 600 && code < 700) {
    return classifySnow(code, temperatureLabel);
  } else if (code >= 700 && code < 800) {
    return classifyAtmosphere(code, temperatureLabel);
  } else if (code === 800) {
    return classifyClear(code, temperatureLabel);
  } else if (code > 800) {
    return classifyCloudy(code, temperatureLabel);
  }

  // no idea
  return oneOf(
    phrases.default,
  );
}
