/*
 * Phrases for classifying weather
 */

export default {
  thunderstorm: {
    veryRainy: [
      "The heavens opened",
      "The skies were split",
      "It's coming down in buckets",
    ],
    freezing: [
      "A lovely day for a walk",
      "A day for the beach",
    ],
    hot: [
      "A bit muggy, a bit noisy",
      "I wouldn't fly a kite",
    ],
    default: ["Claps of thunder"],
  },
  drizzle: {
    hot: [
      "A bit muggy",
      "A bit humid",
      "It's sticky out",
    ],
    freezing: [
      "You'd be frozen solid",
      "You'd be frozen to the bone",
      "You'd be frozen to the core",
      "You'd be frozen to the marrow",
      "You'd be frozen to the soul",
      "Bring the gloves",
    ],
    mild: [
      "It's fierce mild out",
      "It's fierce mild",
      "Sure it's fierce mild",
      "It's jacket weather",
      "It's jacket weather, to be sure",
      "It's jacket weather, jacket weather to be sure",
    ],
    default: [
      "It's damp out",
    ],
  },
  rain: {
    hot: [
      "It's fierce humid out",
      "It's sticky out",
      "You'd get soaked",
    ],
    freezing: [
      "You'd be frozen solid",
      "You'd be frozen to the bone",
      "You'd be frozen to the core",
      "You'd be frozen to the marrow",
      "You'd be frozen to the soul",
      "I wouldn't head out in that",
      "You'd catch your death",
    ],
    veryRainy: [
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
    ],
    default: [
      "It's a bit damp alright",
      "It's a bit moist",
      "It's jacket weather",
      "It's a day for the ducks",
    ],
  },
  snow: {
    freezing: [
      "I doubt it will stick",
      "I'd say there might be some slush",
      "You might get a snowman built",
      "I don't think it will stick",
      "It won't last overnight",
    ],
    hot: [
      "Well that's unusual",
    ],
    default: [
      "It's nice to see the snow",
      "It's chilly out",
      "There'd be some snow up the mountain",
      "We might get the day off if it sticks",
    ],
  },
  atmosphere: {
    hazy: {
      default: [
        "It's a bit hazy",
        "It's a bit hazy out",
        "It's a bit misty",
        "It's a bit misty out",
        "It's a bit foggy out",
        "It's a fecking miserable day",
      ],
    },
    foggy: {
      default: [
        "You can't see your hand in front of your face",
        "I wouldn't drive in that",
        "There'll be a few accidents on the road tonight",
      ],
    },
  },
  clear: {
    hot: [
      "It's a scorcher",
      "You'd bake",
      "You'd roast",
      "You'd fry",
      "You'd get sunburnt",
      "You'd get sunstroke",
      "You'd get sunstroke in that",
    ],
    freezing: [
      "It's a bit nippy out",
      "It's a bit chilly out",
      "It's a bit cold out",
      "It's a bit chilly",
    ],
    default: [
      "It turned into a nice day",
    ],
  },
  cloudy: {
    hot: [
      "You'd roast",
      "You'd fry",
      "You'd cook",
    ],
    default: [
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
    ],
  },
  default: [
    "not a notion",
    "no notion",
    "haven't got the faintest idea",
    "walk outside and look",
  ],
};
