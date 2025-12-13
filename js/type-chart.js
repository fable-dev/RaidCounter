// type-chart.js
// Pokémon GO Type Chart
// 1.6 = Super Effective, 0.625 = Not Very Effective, 0.39 = No Effect

const TYPE_EFFECTIVENESS = {
  normal:   { rock: 0.625, ghost: 0.39, steel: 0.625 },
  fire:     { fire: 0.625, water: 0.625, grass: 1.6, ice: 1.6, bug: 1.6, rock: 0.625, dragon: 0.625, steel: 1.6 },
  water:    { fire: 1.6, water: 0.625, grass: 0.625, ground: 1.6, rock: 1.6, dragon: 0.625 },
  electric: { water: 1.6, electric: 0.625, grass: 0.625, ground: 0.39, flying: 1.6, dragon: 0.625 },
  grass:    { fire: 0.625, water: 1.6, grass: 0.625, poison: 0.625, ground: 1.6, flying: 0.625, bug: 0.625, rock: 1.6, dragon: 0.625, steel: 0.625 },
  ice:      { fire: 0.625, water: 0.625, grass: 1.6, ground: 1.6, flying: 1.6, dragon: 1.6, steel: 0.625 },
  fighting: { normal: 1.6, ice: 1.6, rock: 1.6, dark: 1.6, steel: 1.6, poison: 0.625, flying: 0.625, psychic: 0.625, bug: 0.625, fairy: 0.625, ghost: 0.39 },
  poison:   { grass: 1.6, fairy: 1.6, poison: 0.625, ground: 0.625, rock: 0.625, ghost: 0.625, steel: 0.39 },
  ground:   { fire: 1.6, electric: 1.6, grass: 0.625, poison: 1.6, flying: 0.39, bug: 0.625, rock: 1.6, steel: 1.6 },
  flying:   { electric: 0.625, grass: 1.6, fighting: 1.6, bug: 1.6, rock: 0.625, steel: 0.625 },
  psychic:  { fighting: 1.6, poison: 1.6, psychic: 0.625, dark: 0.39, steel: 0.625 },
  bug:      { fire: 0.625, grass: 1.6, fighting: 0.625, poison: 0.625, flying: 0.625, psychic: 1.6, ghost: 0.625, dark: 1.6, steel: 0.625, fairy: 0.625 },
  rock:     { fire: 1.6, ice: 1.6, fighting: 0.625, ground: 0.625, flying: 1.6, bug: 1.6, steel: 0.625 },
  ghost:    { normal: 0.39, psychic: 1.6, ghost: 1.6, dark: 0.625 },
  dragon:   { dragon: 1.6, steel: 0.625, fairy: 0.39 },
  dark:     { fighting: 0.625, psychic: 1.6, ghost: 1.6, dark: 0.625, fairy: 0.625 },
  steel:    { fire: 0.625, water: 0.625, electric: 0.625, ice: 1.6, rock: 1.6, fairy: 1.6, steel: 0.625 },
  fairy:    { fighting: 1.6, dragon: 1.6, dark: 1.6, fire: 0.625, poison: 0.625, steel: 0.625 },
};

// Defending type → attacking type multipliers
const TYPE_WEAKNESSES = {
  normal:  { fighting: 1.6, ghost: 0.39 },
  fire:    { water: 1.6, ground: 1.6, rock: 1.6, fire: 0.625, grass: 0.625, ice: 0.625, bug: 0.625, steel: 0.625, fairy: 0.625 },
  water:   { electric: 1.6, grass: 1.6, fire: 0.625, water: 0.625, ice: 0.625, steel: 0.625 },
  electric:{ ground: 1.6, electric: 0.625, flying: 0.625, steel: 0.625 },
  grass:   { fire: 1.6, ice: 1.6, poison: 1.6, flying: 1.6, bug: 1.6, water: 0.625, electric: 0.625, grass: 0.625, ground: 0.625 },
  ice:     { fire: 1.6, fighting: 1.6, rock: 1.6, steel: 1.6, ice: 0.625 },
  fighting:{ flying: 1.6, psychic: 1.6, fairy: 1.6, bug: 0.625, rock: 0.625, dark: 0.625 },
  poison:  { ground: 1.6, psychic: 1.6, grass: 0.625, fighting: 0.625, poison: 0.625, bug: 0.625, fairy: 0.625 },
  ground:  { water: 1.6, grass: 1.6, ice: 1.6, electric: 0.39, poison: 0.625, rock: 0.625 },
  flying:  { electric: 1.6, ice: 1.6, rock: 1.6, grass: 0.625, fighting: 0.625, bug: 0.625, ground: 0.39 },
  psychic: { bug: 1.6, ghost: 1.6, dark: 1.6, fighting: 0.625, psychic: 0.625 },
  bug:     { fire: 1.6, flying: 1.6, rock: 1.6, grass: 0.625, fighting: 0.625, ground: 0.625 },
  rock:    { water: 1.6, grass: 1.6, fighting: 1.6, ground: 1.6, steel: 1.6, normal: 0.625, fire: 0.625, poison: 0.625, flying: 0.625 },
  ghost:   { ghost: 1.6, dark: 1.6, normal: 0.39, fighting: 0.39, poison: 0.625, bug: 0.625 },
  dragon:  { ice: 1.6, dragon: 1.6, fairy: 1.6, fire: 0.625, water: 0.625, electric: 0.625, grass: 0.625 },
  dark:    { fighting: 1.6, bug: 1.6, fairy: 1.6, psychic: 0.39, ghost: 0.625, dark: 0.625 },
  steel:   { fire: 1.6, fighting: 1.6, ground: 1.6, normal: 0.625, grass: 0.625, ice: 0.625, flying: 0.625, psychic: 0.625, bug: 0.625, rock: 0.625, dragon: 0.625, steel: 0.625, fairy: 0.625, poison: 0.39 },
  fairy:   { poison: 1.6, steel: 1.6, fighting: 0.625, bug: 0.625, dark: 0.625, dragon: 0.39 },
};

// Calculate attack multiplier (attack type vs. one or more defending types)
function getAttackMultiplier(attackType, defendTypes) {
  return defendTypes.reduce((mult, defType) => {
    const typeMap = TYPE_EFFECTIVENESS[attackType] || {};
    const m = typeMap[defType] || 1;
    return mult * m;
  }, 1);
}

module.exports = { TYPE_EFFECTIVENESS, TYPE_WEAKNESSES, getAttackMultiplier };

