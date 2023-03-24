import phrases from "../netlify/edge-functions/src/phrases.ts";
import * as Weather from "../netlify/edge-functions/src/classifier.ts";
import * as Codes from "../netlify/edge-functions/src/codes.ts";

type TestCaseParams = {
  codes: number[];
  temps: number[];
  phraseSet: string[];
};
type TestCase = {
  response: {
    weather: {
      id: number;
    }[];
    main: {
      temp: number;
    };
  };
  phraseSet: string[];
};

const toKelvin = (celcius: number) => celcius + 273.15;

// in celcius
const temperatures = {
  ARCTIC: -30,
  BALTIC: -20,
  FREEZING: -10,
  CHILLY: 0,
  MILD: 10,
  WARM: 17,
  HOT: 25,
  ROASTING: 30,
  OVEN: 35,
};

const tests: any[] = [];

function* addTestCase({ codes, temps, phraseSet }: TestCaseParams) {
  for (const code of codes) {
    for (const temp of temps) {
      yield ({
        response: {
          weather: [{
            id: code,
          }],
          main: {
            temp: toKelvin(temp),
          },
        },
        phraseSet,
      });
    }
  }
}

function* thunderstormTestCases() {
  yield* addTestCase({
    codes: [
      Codes.ThunderstormWithHeavyRain,
      Codes.ThunderstormWithLightRain,
      Codes.ThunderstormWithHeavyDrizzle,
    ],
    temps: [temperatures.ARCTIC, temperatures.BALTIC, temperatures.FREEZING],
    phraseSet: phrases.thunderstorm.veryRainy,
  });

  yield* addTestCase({
    codes: [
      Codes.Thunderstorm,
    ],
    temps: [temperatures.ARCTIC],
    phraseSet: phrases.thunderstorm.freezing,
  });

  yield* addTestCase({
    codes: [
      Codes.Thunderstorm,
    ],
    temps: [temperatures.ROASTING, temperatures.OVEN],
    phraseSet: phrases.thunderstorm.hot,
  });

  yield* addTestCase({
    codes: [
      Codes.Thunderstorm,
    ],
    temps: [temperatures.MILD],
    phraseSet: phrases.thunderstorm.default,
  });
}

function drizzleTestCases() {
}
function rainTestCases() {
}
function snowTestCases() {
}
function atmosphereTestCases() {
}
function clearTestCases() {
}
function cloudsTestCases() {
}

const testCases = [
  drizzleTestCases,
  rainTestCases,
  snowTestCases,
  atmosphereTestCases,
  clearTestCases,
  cloudsTestCases,
];

for (const caseSet of testCases) {
  for (const { response, phraseSet } of caseSet) {
    Deno.test("Weather is classified as expected", () => {
      const classification = Weather.classify(response);

      if (!phraseSet.includes(classification)) {
        throw new Error(`Expected ${classification} to be in ${phraseSet}`);
      }
    });
  }
}
