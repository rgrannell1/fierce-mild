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
