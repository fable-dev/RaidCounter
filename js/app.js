let raidBosses = [];
let pokemonList = [];
let moves = [];
let movesById = {};

// Load JSON data
async function loadData() {
  try {
    const [bossesRes, pokemonRes, movesRes] = await Promise.all([
      fetch("data/raid_bosses.json"),
      fetch("data/pokemon_stats.json"),
      fetch("data/moves.json")
    ]);

    raidBosses = await bossesRes.json();
    pokemonList = await pokemonRes.json();
    moves = await movesRes.json();

    movesById = {};
    moves.forEach((m) => {
      movesById[m.id] = m;
    });

    populateBossSelect();
  } catch (e) {
    console.error("Error loading data", e);
    const container = document.getElementById("results");
    if (container) {
      container.textContent = "Error loading data. Check console for details.";
    }
  }
}

function populateBossSelect() {
  const select = document.getElementById("boss-select");
  if (!select) return;

  raidBosses.forEach((boss) => {
    const opt = document.createElement("option");
    opt.value = boss.id;
    opt.textContent = boss.name;
    select.appendChild(opt);
  });

  select.addEventListener("change", onBossChange);

  if (raidBosses.length > 0) {
    select.value = raidBosses[0].id;
    onBossChange();
  }
}

function onBossChange() {
  const select = document.getElementById("boss-select");
  const bossId = select.value;
  const boss = raidBosses.find((b) => b.id === bossId);
  if (!boss) return;

  const counters = getBestCounters(boss, pokemonList, POKEMON_MOVESETS);
  renderResults(boss, counters);
}

// Scoring helpers

function scoreMoveset(pokemon, boss, fastMove, chargedMove) {
  const bossTypes = boss.types || [];

  const fastStab = pokemon.types.includes(fastMove.type) ? 1.2 : 1.0;
  const chargedStab = pokemon.types.includes(chargedMove.type) ? 1.2 : 1.0;

  const fastEff = getAttackMultiplier(fastMove.type, bossTypes);
  const chargedEff = getAttackMultiplier(chargedMove.type, bossTypes);

  const fastDps = fastMove.power / fastMove.duration;
  const chargedDps = chargedMove.power / chargedMove.duration;

  // Rough combined DPS: weight fast 60%, charged 40%
  const combinedDps =
    fastDps * fastStab * fastEff * 0.6 +
    chargedDps * chargedStab * chargedEff * 0.4;

  const baseScore = combinedDps * pokemon.attack;

  // Slight bonuses for megas/shadows if you add them later.
  let modifier = 1.0;
  if (pokemon.is_mega) modifier *= 1.1;
  if (pokemon.is_shadow) modifier *= 1.05;

  return baseScore * modifier;
}

function getBestCounters(boss, pokemonList, movesets, limit = 12) {
  const results = [];

  for (const pkm of pokemonList) {
    const moveSet = movesets[pkm.id];
    if (!moveSet) continue;

    let bestScore = 0;
    let bestFast = null;
    let bestCharged = null;

    for (const fastId of moveSet.fast) {
      for (const chargedId of moveSet.charged) {
        const fast = movesById[fastId];
        const charged = movesById[chargedId];
        if (!fast || !charged) continue;

        const score = scoreMoveset(pkm, boss, fast, charged);
        if (score > bestScore) {
          bestScore = score;
          bestFast = fast;
          bestCharged = charged;
        }
      }
    }

    if (bestFast && bestCharged) {
      results.push({
        pokemon: pkm,
        score: bestScore,
        fastMove: bestFast,
        chargedMove: bestCharged
      });
    }
  }

  results.sort((a, b) => b.score - a.score);
  return results.slice(0, limit);
}

// UI rendering

function renderResults(boss, counters) {
  const container = document.getElementById("results");
  if (!container) return;

  container.innerHTML = "";

  const title = document.createElement("h2");
  title.textContent = `Best counters vs ${boss.name}`;
  container.appendChild(title);

  const meta = document.createElement("div");
  meta.className = "boss-meta";
  const tierText = boss.tier ? `Tier ${boss.tier}` : "Raid boss";
  meta.innerHTML =
    `${tierText} · Types: ` +
    boss.types
      .map(
        (t) => `<span class="type-pill type-${t}">${t.toUpperCase()}</span>`
      )
      .join(" ");
  container.appendChild(meta);

  if (!counters.length) {
    const empty = document.createElement("p");
    empty.textContent = "No counters found in current data set.";
    container.appendChild(empty);
    return;
  }

  const list = document.createElement("ol");
  list.className = "counter-list";

  counters.forEach((entry, index) => {
    const li = document.createElement("li");
    li.className = "counter-item";

    const header = document.createElement("div");
    header.className = "counter-header";

    const nameSpan = document.createElement("span");
    nameSpan.className = "counter-name";
    nameSpan.textContent = entry.pokemon.name;

    const tagSpan = document.createElement("span");
    tagSpan.className = "counter-tag";

    if (index < 3) {
      tagSpan.classList.add("tag-top");
      tagSpan.textContent = "Top";
    } else if (index < 8) {
      tagSpan.classList.add("tag-good");
      tagSpan.textContent = "Good";
    } else {
      tagSpan.classList.add("tag-budget");
      tagSpan.textContent = "Budget";
    }

    header.appendChild(nameSpan);
    header.appendChild(tagSpan);

    const movesDiv = document.createElement("div");
    movesDiv.className = "counter-moves";
    movesDiv.innerHTML = `
      <span>Fast: ${entry.fastMove.name} (${entry.fastMove.type.toUpperCase()})</span>
      <span>Charged: ${entry.chargedMove.name} (${entry.chargedMove.type.toUpperCase()})</span>
    `;

    li.appendChild(header);
    li.appendChild(movesDiv);
    list.appendChild(li);
  });

  container.appendChild(list);
}

// Kick things off
loadData();

