export type WeatherResponse = {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number;
    grnd_level?: number;
  };
  visibility?: number;
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  rain?: {
    "1h": number;
    "3h"?: number;
  };
  snow?: {
    "1h": number;
    "3h"?: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type?: number;
    id?: number;
    country?: string;
    sunrise?: number;
    sunset?: number;
    pod?: string;
  };
  timezone?: number;
  id: number;
  name: string;
  cod: number;
};

export const WEATHER_CODES = {
  // Thunderstorm
  200: "THUNDERSTORM_WITH_LIGHT_RAIN",
  201: "THUNDERSTORM_WITH_RAIN",
  202: "THUNDERSTORM_WITH_HEAVY_RAIN",
  210: "LIGHT_THUNDERSTORM",
  211: "THUNDERSTORM",
  212: "HEAVY_THUNDERSTORM",
  221: "RAINY_THUNDERSTORM",
  230: "THUNDERSTORM_WITH_LIGHT_DRIZZLE",
  231: "THUNDERSTORM_WITH_DRIZZLE",
  232: "THUNDERSTORM_WITH_HEAVY_DRIZZLE",

  // Drizzle
  300: "LIGHT_INTENSITY_DRIZZLE",
  301: "DRIZZLE",
  302: "HEAVY_INTENSITY_DRIZZLE",
  310: "LIGHT_INTENSITY_DRIZZLE_RAIN",
  311: "DRIZZLE_RAIN",
  312: "HEAVY_INTENSITY_DRIZZLE_RAIN",
  313: "SHOWER_RAIN_AND_DRIZZLE",
  314: "HEAVY_SHOWER_RAIN_AND_DRIZZLE",
  321: "SHOWER_DRIZZLE",

  // Rain
  500: "LIGHT_RAIN",
  501: "MODERATE_RAIN",
  502: "HEAVY_INTENSITY_RAIN",
  503: "VERY_HEAVY_RAIN",
  504: "EXTREME_RAIN",
  511: "FREEZING_RAIN",
  520: "LIGHT_INTENSITY_SHOWER_RAIN",
  521: "SHOWER_RAIN",
  522: "HEAVY_INTENSITY_SHOWER_RAIN",
  531: "RAGGED_SHOWER_RAIN",
  600: "LIGHT_SNOW",
  601: "SNOW",
  602: "HEAVY_SNOW",
  611: "SLEET",
  612: "SHOWER_SLEET",
  615: "LIGHT_RAIN_AND_SNOW",
  616: "RAIN_AND_SNOW",
  620: "LIGHT_SHOWER_SNOW",
  621: "SHOWER_SNOW",
  701: "MIST",
  711: "SMOKE",
  721: "HAZE",
  731: "SAND_DUST_WHIRLS",
  741: "FOG",
  751: "SAND",
  761: "DUST",
  762: "VOLCANIC_ASH",
  771: "SQUALLS",
  781: "TORNADO",
  800: "CLEAR_SKY",
  801: "FEW_CLOUDS",
  802: "SCATTERED_CLOUDS",
  803: "BROKEN_CLOUDS",
  804: "OVERCAST_CLOUDS",
};
