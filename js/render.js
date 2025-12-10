// js/render.js
import { getBoostedTypes, getWeatherLabel } from "./weather.js";

export function renderResults(boss, weatherKey) {
  const container = document.getElementById("results");
  container.innerHTML = "";

  if (!boss) {
    container.innerHTML =
      '<div class="empty-state">No raid boss found. Try typing "Kyurem" exactly as shown.</div>';
    return;
  }

  const boostedTypes = getBoostedTypes(weatherKey);

  // Sort counters: weather-boosted types first
  const counters = boss.recommendedCounters.slice().sort((a, b) => {
    const aBoosted = a.types.some((t) => boostedTypes.includes(t));
    const bBoosted = b.types.some((t) => boostedTypes.includes(t));
    if (aBoosted === bBoosted) return 0;
    return aBoosted ? -1 : 1;
  });

  const header = document.createElement("div");
  header.className = "results-header";

  const boostedWeatherLabels = (boss.boostedWeathers || [])
    .map((w) => getWeatherLabel(w))
    .join(", ");

  let metaHtml = `
    <div class="boss-name">${boss.name}</div>
    <div class="boss-meta">
      Tier ${boss.tier}
      ${boss.types
        .map((t) => `<span class="type-badge">${t}</span>`)
        .join(" ")}
    </div>
  `;

  if (boss.catchCP) {
    metaHtml += `
      <div class="boss-meta">
        Catch CP:
        ${boss.catchCP.level20.min}&ndash;${boss.catchCP.level20.max}
        (${boss.catchCP.level20.label})
      </div>
      <div class="boss-meta">
        ${boss.catchCP.level25.min}&ndash;${boss.catchCP.level25.max}
        (${boss.catchCP.level25.label})
      </div>
    `;
  }

  if (boss.shinyAvailable) {
    metaHtml += `
      <div class="boss-meta">
        <span class="chip">Shiny available (≈1 in 20)</span>
      </div>
    `;
  }

  if (boostedWeatherLabels) {
    metaHtml += `
      <div class="boss-meta">
        Weather boosted in: ${boostedWeatherLabels}
      </div>
    `;
  }

  if (boss.summary) {
    metaHtml += `
      <div class="boss-meta">
        ${boss.summary}
      </div>
    `;
  }

  const left = document.createElement("div");
  left.innerHTML = metaHtml;

  const right = document.createElement("div");
  const weatherLabel = getWeatherLabel(weatherKey);
  right.innerHTML = `
    <span class="chip">
      Weather: ${weatherLabel}
    </span>
  `;

  header.appendChild(left);
  header.appendChild(right);
  container.appendChild(header);

  if (boss.recommendedTeam) {
    const teamInfo = document.createElement("div");
    teamInfo.className = "boss-meta";
    teamInfo.style.marginTop = "0.5rem";
    teamInfo.textContent = boss.recommendedTeam;
    container.appendChild(teamInfo);
  }

  if (!counters.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "No counters defined yet for this boss.";
    container.appendChild(empty);
    return;
  }

  counters.forEach((c) => {
    const isBoosted = c.types.some((t) => boostedTypes.includes(t));
    const card = document.createElement("article");
    card.className = "counter-card";
    card.innerHTML = `
      <div class="counter-header">
        <div class="counter-name">${c.name}</div>
        ${isBoosted ? '<div class="boosted-tag">Weather boosted</div>' : ""}
      </div>
      <div class="moves">
        <strong>Types:</strong> ${c.types
          .map((t) => `<span class="type-badge">${t}</span>`)
          .join(" ")}
      </div>
      <div class="moves">
        <strong>Moveset:</strong> ${c.fastMove} &raquo; ${c.chargedMove}
      </div>
      ${c.note ? `<div class="note">${c.note}</div>` : ""}
    `;
    container.appendChild(card);
  });
}
