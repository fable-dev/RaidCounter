// js/render.js
import { getBoostedTypes, getWeatherLabel } from "./weather.js";

// Map primary type to a simple emoji icon
function getTypeIcon(types = []) {
  const primary = types[0];
  const map = {
    Dragon: "🐉",
    Ice: "❄️",
    Fire: "🔥",
    Water: "💧",
    Grass: "🌿",
    Rock: "🪨",
    Steel: "⚙️",
    Fairy: "✨",
    Fighting: "🥊",
    Electric: "⚡️",
    Dark: "🌘",
    Ghost: "👻",
    Psychic: "🔮",
    Ground: "🌋",
    Flying: "🕊️",
    Bug: "🐛",
    Normal: "⭐",
    Poison: "☠️",
  };
  return map[primary] || "⭐";
}

function renderHero(boss) {
  const titleEl = document.getElementById("hero-title");
  const line1El = document.getElementById("hero-line-1");
  const line2El = document.getElementById("hero-line-2");
  const line3El = document.getElementById("hero-line-3");
  const pillEl = document.getElementById("hero-pill");
  const iconEl = document.getElementById("hero-icon");

  if (!boss || !titleEl || !pillEl) return;

  // Title: "Best <name> counters in Pokémon GO"
  titleEl.textContent = `Best ${boss.name} counters in Pokémon GO`;

  // Use quickSummary if present, fallback to generic constructed lines
  if (boss.quickSummary) {
    line1El.textContent = boss.quickSummary.line1 || "";
    line2El.textContent = boss.quickSummary.line2 || "";
    line3El.textContent = boss.quickSummary.line3 || "";
  } else {
    const typeLine = boss.types
      ? `${boss.name} is a ${boss.types.join(" / ")} raid boss in Pokémon GO.`
      : `${boss.name} is a raid boss in Pokémon GO.`;

    const weaknessLine = boss.weaknesses
      ? `It is weak to ${boss.weaknesses.join(", ")}-type moves.`
      : "";

    line1El.textContent = typeLine;
    line2El.textContent = weaknessLine;
    line3El.textContent = "";
  }

  const pillParts = [];
  if (boss.tier) pillParts.push(`Tier ${boss.tier}`);
  if (boss.category) pillParts.push(boss.category);
  pillEl.textContent = pillParts.join(" · ") || "Raid boss";

  if (iconEl) {
    iconEl.textContent = getTypeIcon(boss.types);
  }
}

export function renderResults(boss, weatherKey) {
  const container = document.getElementById("results");
  container.innerHTML = "";

  // Always update hero first
  if (boss) {
    renderHero(boss);
  }

  if (!boss) {
    container.innerHTML =
      '<div class="empty-state">No raid boss found. Try typing a name from the list.</div>';
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

  /* ---------- Boss header ---------- */

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
    teamInfo.style.marginTop = "0.25rem";
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

  /* ---------- Table + show-all toggle ---------- */

  const SHOW_LIMIT = 3;
  let expanded = false;

  const tableWrapper = document.createElement("div");
  tableWrapper.className = "table-wrapper";

  const table = document.createElement("table");
  table.className = "counter-table";

  const thead = document.createElement("thead");
  thead.innerHTML = `
    <tr>
      <th class="col-rank">#</th>
      <th class="col-attacker">Attacker</th>
      <th class="col-move">Fast move</th>
      <th class="col-move">Charge move</th>
      <th class="col-meta">Notes</th>
    </tr>
  `;
  const tbody = document.createElement("tbody");

  table.appendChild(thead);
  table.appendChild(tbody);
  tableWrapper.appendChild(table);
  container.appendChild(tableWrapper);

  function renderRows() {
    tbody.innerHTML = "";
    const limit = expanded ? counters.length : Math.min(SHOW_LIMIT, counters.length);

    counters.slice(0, limit).forEach((c, index) => {
      const isBoosted = c.types.some((t) => boostedTypes.includes(t));

      const tr = document.createElement("tr");

      const rankTd = document.createElement("td");
      rankTd.className = "col-rank";
      rankTd.textContent = index + 1 + ".";
      tr.appendChild(rankTd);

      const attackerTd = document.createElement("td");
      attackerTd.className = "col-attacker";
      attackerTd.innerHTML = `
        <div class="attacker-name">${c.name}</div>
        <div class="attacker-types">
          ${c.types
            .map((t) => `<span class="type-badge">${t}</span>`)
            .join(" ")}
        </div>
      `;
      tr.appendChild(attackerTd);

      const fastTd = document.createElement("td");
      fastTd.className = "col-move";
      fastTd.textContent = c.fastMove;
      tr.appendChild(fastTd);

      const chargeTd = document.createElement("td");
      chargeTd.className = "col-move";
      chargeTd.textContent = c.chargedMove;
      tr.appendChild(chargeTd);

      const metaTd = document.createElement("td");
      metaTd.className = "col-meta";
      metaTd.innerHTML = `
        ${
          isBoosted
            ? '<div class="boosted-pill">Weather boosted</div>'
            : ""
        }
        ${
          c.note
            ? `<div class="note-inline">${c.note}</div>`
            : ""
        }
      `;
      tr.appendChild(metaTd);

      tbody.appendChild(tr);
    });
  }

  renderRows();

  if (counters.length > SHOW_LIMIT) {
    const toggleWrapper = document.createElement("div");
    toggleWrapper.className = "toggle-wrapper";

    const toggleBtn = document.createElement("button");
    toggleBtn.type = "button";
    toggleBtn.className = "secondary-button";
    toggleBtn.textContent = "Show all counters";

    toggleBtn.addEventListener("click", () => {
      expanded = !expanded;
      toggleBtn.textContent = expanded
        ? "Show top 3 only"
        : "Show all counters";
      renderRows();
    });

    toggleWrapper.appendChild(toggleBtn);
    container.appendChild(toggleWrapper);
  }
}
