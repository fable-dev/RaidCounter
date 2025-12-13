// Simple type effectiveness chart for Pokémon GO-style multipliers.
// Values are 1.6 (super effective), 0.625 (not very effective), 0.39 (immune), default 1.0.

const TYPE_EFFECTIVENESS = {
  normal: {
    rock: 0.625,
    steel: 0.625,
    ghost: 0.39
  },
  fire: {
    grass: 1.6,
    ice: 1.6,
    bug: 1.6,
    steel: 1.6,
    fire: 0.625,
    water: 0.625,
    rock: 0.625,
    dragon: 0.625
  },
  water: {
    fire: 1.6,
    ground: 1.6,
    rock: 1.6,
    water: 0.625,
    grass: 0.625,
    dragon: 0.625
  },
  electric: {
    water: 1.6,
    flying: 1.6,
    electric: 0.625,
    grass: 0.625,
    dragon: 0.625,
    ground: 0.39
  },
  grass: {
    water: 1.6,
    ground: 1.6,
    rock: 1.6,
    fire: 0.625,
    grass: 0.625,
    poison: 0.625,
    flying: 0.625,
    bug: 0.625,
    dragon: 0.625,
    steel: 0.625
  },
  ice: {
    grass: 1.6,
    ground: 1.6,
    flying: 1.6,
    dragon: 1.6,
    fire: 0.625,
    water: 0.625,
    ice: 0.625,
    steel: 0.625
  },
  fighting: {
    normal: 1.6,
    ice: 1.6,
    rock: 1.6,
    dark: 1.6,
    steel: 1.6,
    poison: 0.625,
    flying: 0.625,
    psychic: 0.625,
    bug: 0.625,
    fairy: 0.625,
    ghost: 0.39
  },
  poison: {
    grass: 1.6,
    fairy: 1.6,
    poison: 0.625,
    ground: 0.625,
    rock: 0.625,
    ghost: 0.625,
    steel: 0.39
  },
  ground: {
    fire: 1.6,
    electric: 1.6,
    poison: 1.6,
    rock: 1.6,
    steel: 1.6,
    grass: 0.625,
    bug: 0.625,
    flying: 0.39
  },
  flying: {
    grass: 1.6,
    fighting: 1.6,
    bug: 1.6,
    electric: 0.625,
    rock: 0.625,
    steel: 0.625
  },
  psychic: {
    fighting: 1.6,
    poison: 1.6,
    psychic: 0.625,
    steel: 0.625,
    dark: 0.39
  },
  bug: {
    grass: 1.6,
    psychic: 1.6,
    dark: 1.6,
    fire: 0.625,
    fighting: 0.625,
    poison: 0.625,
    flying: 0.625,
    ghost: 0.625,
    steel: 0.625,
    fairy: 0.625
  },
  rock: {
    fire: 1.6,
    ice: 1.6,
    flying: 1.6,
    bug: 1.6,
    fighting: 0.625,
    ground: 0.625,
    steel: 0.625
  },
  ghost: {
    psychic: 1.6,
    ghost: 1.6,
    dark: 0.625,
    normal: 0.39
  },
  dragon: {
    dragon: 1.6,
    steel: 0.625,
    fairy: 0.39
  },
  dark: {
    psychic: 1.6,
    ghost: 1.6,
    fighting: 0.625,
    dark: 0.625,
    fairy: 0.625
  },
  steel: {
    ice: 1.6,
    rock: 1.6,
    fairy: 1.6,
    fire: 0.625,
    water: 0.625,
    electric: 0.625,
    steel: 0.625
  },
  fairy: {
    fighting: 1.6,
    dragon: 1.6,
    dark: 1.6,
    fire: 0.625,
    poison: 0.625,
    steel: 0.625
  }
};

function getAttackMultiplier(attackType, defenderTypes) {
  const mapping = TYPE_EFFECTIVENESS[attackType] || {};
  return defenderTypes.reduce((mult, defType) => {
    const v = mapping[defType] != null ? mapping[defType] : 1;
    return mult * v;
  }, 1);
}
