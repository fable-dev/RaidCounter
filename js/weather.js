// js/weather.js

export const weatherBoosts = {
  clear: ["Grass", "Ground", "Fire"],
  rainy: ["Water", "Electric", "Bug"],
  partly_cloudy: ["Normal", "Rock"],
  cloudy: ["Fairy", "Fighting", "Poison"],
  windy: ["Dragon", "Flying", "Psychic"],
  snow: ["Ice", "Steel"],
  fog: ["Dark", "Ghost"],
};

export function getBoostedTypes(weatherKey) {
  if (!weatherKey || !weatherBoosts[weatherKey]) return [];
  return weatherBoosts[weatherKey];
}

export function getWeatherLabel(weatherKey) {
  switch (weatherKey) {
    case "clear":
      return "Clear / Sunny";
    case "rainy":
      return "Rainy";
    case "partly_cloudy":
      return "Partly Cloudy";
    case "cloudy":
      return "Cloudy";
    case "windy":
      return "Windy";
    case "snow":
      return "Snow";
    case "fog":
      return "Fog";
    default:
      return "No weather boost";
  }
}
