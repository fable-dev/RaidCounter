// js/app.js
import { raidBosses } from "./data/raidBosses.js";
import { renderResults } from "./render.js";

const bossInput = document.getElementById("boss-input");
const bossList = document.getElementById("boss-list");
const weatherSelect = document.getElementById("weather-select");
const form = document.getElementById("raid-form");

// Populate datalist with bosses (only Kyurem for now, but future-proof)
raidBosses
  .slice()
  .sort((a, b) => a.name.localeCompare(b.name))
  .forEach((boss) => {
    const opt = document.createElement("option");
    opt.value = boss.name;
    bossList.appendChild(opt);
  });

function findBossByName(name) {
  if (!name) return null;
  const lower = name.trim().toLowerCase();
  return raidBosses.find((b) => b.name.toLowerCase() === lower) || null;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const bossName = bossInput.value;
  const weatherKey = weatherSelect.value;
  const boss = findBossByName(bossName);
  renderResults(boss, weatherKey);
});

// Auto-load Kyurem as default on page load
window.addEventListener("DOMContentLoaded", () => {
  const defaultBossName = "Kyurem";
  bossInput.value = defaultBossName;
  const boss = findBossByName(defaultBossName);
  renderResults(boss, "");
});
