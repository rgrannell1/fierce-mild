import { WEATHER_CODES, WeatherResponse } from "./types.ts";

function oneOf(args: string[]) {
  return args[Math.floor(Math.random() * args.length)];
}

export class Temperature {
  static ARCTIC = "arctic";
  static BALTIC = "baltic";
  static FREEZING = "freezing";
  static CHILLY = "chilly";
  static MILD = "mild";
  static WARM = "warm";
  static HOT = "hot";
  static ROASTING = "roasting";
  static OVEN = "oven";

  static label(kelvin: number): string {
    const celcius = kelvin - 273.15;

    if (celcius < -20) {
      return Temperature.ARCTIC;
    } else if (celcius < -10) {
      return Temperature.BALTIC;
    } else if (celcius < 0) {
      return Temperature.FREEZING;
    } else if (celcius < 10) {
      return "chilly";
    } else if (celcius < 17) {
      return Temperature.MILD;
    } else if (celcius < 25) {
      return Temperature.WARM;
    } else if (celcius < 30) {
      return Temperature.HOT;
    } else if (celcius < 35) {
      return Temperature.ROASTING;
    } else {
      return Temperature.OVEN;
    }
  }
}

function classifyThunderstorm(code: number, temperatureLabel: string) {
  const isVeryRainy = new Set([
    202,
    212,
    232,
  ]).has(code);

  if (isVeryRainy) {
    return oneOf([
      "The heavens opened",
      "The skies were split",
      "It's coming down in buckets",
    ]);
  }

  // womp womp
  if (temperatureLabel === Temperature.ARCTIC) {
    return oneOf([
      "A lovely day for a walk",
      "A day for the beach",
    ]);
  }

  if (
    temperatureLabel === Temperature.ROASTING ||
    temperatureLabel === Temperature.OVEN
  ) {
    return oneOf([
      "A bit muggy, a bit noisy",
      "I wouldn't fly a kite",
    ]);
  }

  return oneOf([
    "Claps of thunder",
  ]);
}

function classifyDrizzle(code: number, temperatureLabel: string) {
  if (
    temperatureLabel === Temperature.ROASTING ||
    temperatureLabel === Temperature.OVEN
  ) {
    return oneOf([
      "A bit muggy",
      "A bit humid",
      "It's sticky out",
    ]);
  }

  if (
    temperatureLabel === Temperature.BALTIC ||
    temperatureLabel === Temperature.FREEZING
  ) {
    return oneOf([
      "You'd be frozen solid",
      "You'd be frozen to the bone",
      "You'd be frozen to the core",
      "You'd be frozen to the marrow",
      "You'd be frozen to the soul",
      "Bring the gloves",
    ]);
  }

  if (
    temperatureLabel === Temperature.CHILLY ||
    temperatureLabel === Temperature.MILD
  ) {
    return oneOf([
      "It's fierce mild out",
      "It's fierce mild",
      "Sure it's fierce mild",
      "It's jacket weather",
      "It's jacket weather, to be sure",
      "It's jacket weather, jacket weather to be sure",
    ]);
  }

  return oneOf([
    "It's damp out",
  ]);
}

function classifyRain(code: number, temperatureLabel: string) {
  if (
    temperatureLabel === Temperature.ROASTING ||
    temperatureLabel === Temperature.OVEN
  ) {
    return oneOf([
      "It's fierce humid out",
      "It's sticky out",
      "You'd get soaked",
    ]);
  }

  if (
    temperatureLabel === Temperature.BALTIC ||
    temperatureLabel === Temperature.FREEZING
  ) {
    return oneOf([
      "You'd be frozen solid",
      "You'd be frozen to the bone",
      "You'd be frozen to the core",
      "You'd be frozen to the marrow",
      "You'd be frozen to the soul",
      "I wouldn't head out in that",
      "You'd catch your death",
    ]);
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
    return oneOf([
      "It's pissing",
      "It's pissing out",
      "It's pissing outside",
      "It's raining cats and dogs",
      "It's bucketing",
      "It's torrential",
      "It's absolutely flooded outside",
      "It's absolutely flooded",
      "It's lashing",
      "It's absolutely lashing",
    ]);
  } else {
    return oneOf([
      "It's a bit damp alright",
      "It's a bit moist",
      "It's jacket weather",
      "It's a day for the ducks",
    ]);
  }
}

function classifySnow(code: number, temperatureLabel: string) {
  if (
    temperatureLabel !== Temperature.BALTIC &&
    temperatureLabel !== Temperature.ARCTIC
  ) {
    return oneOf([
      "I doubt it will stick",
      "I'd say there might be some slush",
      "You might get a snowman built",
      "I don't think it will stick",
      "It won't last overnight",
    ]);
  }

  if (
    temperatureLabel === Temperature.HOT ||
    temperatureLabel === Temperature.ROASTING ||
    temperatureLabel === Temperature.OVEN
  ) {
    return oneOf([
      "Well that's unusual",
    ]);
  }

  return oneOf([
    "It's nice to see the snow",
    "It's chilly out",
    "There'd be some snow up the mountain",
    "We might get the day off if it sticks",
  ]);
}

function classifyAtmosphere(code: number, temperatureLabel: string) {
  if (code === 701 || code === 721) {
    return oneOf([
      "It's a bit hazy",
      "It's a bit hazy out",
      "It's a bit misty",
      "It's a bit misty out",
      "It's a bit foggy out",
      "It's a fecking miserable day",
    ]);
  }

  if (code === 741) {
    return oneOf([
      "You can't see your hand in front of your face",
      "I wouldn't drive in that",
      "There'll be a few accidents on the road tonight",
    ]);
  }
}

function classifyClear(code: number, temperatureLabel: string) {
  if (
    temperatureLabel === Temperature.ROASTING ||
    temperatureLabel === Temperature.OVEN
  ) {
    return oneOf([
      "It's a scorcher",
      "You'd bake",
      "You'd roast",
      "You'd fry",
      "You'd get sunburnt",
      "You'd get sunstroke",
      "You'd get sunstroke in that",
    ]);
  }

  if (
    temperatureLabel === Temperature.BALTIC ||
    temperatureLabel === Temperature.FREEZING
  ) {
    return oneOf([
      "It's a bit nippy out",
      "It's a bit chilly out",
      "It's a bit cold out",
      "It's a bit chilly",
    ]);
  }

  return oneOf([
    "It turned into a nice day",
  ]);
}

function classifyCloudy(code: number, temperatureLabel: string) {
  if (
    temperatureLabel === Temperature.ROASTING ||
    temperatureLabel === Temperature.OVEN
  ) {
    return oneOf([
      "You'd roast",
      "You'd fry",
      "You'd cook",
    ]);
  }

  return oneOf([
    "It's fierce mild",
    "It's a bit cloudy",
    "It's a bit grey out",
    "It's a bit grey",
    "It's a bit gloomy out",
    "It's a bit gloomy",
    "It's a bit dull out",
    "It's a bit dull",
    "It's a bit murky out",
    "It's a bit murky",
  ]);
}

export function classify(weather: WeatherResponse) {
  const summary = weather.weather[0];
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
  return oneOf([
    "not a notion",
    "no notion",
    "haven't got the faintest idea",
    "walk outside and look",
  ]);
}
