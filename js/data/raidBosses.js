// js/data/raidBosses.js

export const raidBosses = [
  {
    name: "Kyurem",
    tier: 5,
    category: "Legendary",
    types: ["Dragon", "Ice"],
    weaknesses: ["Fighting", "Steel", "Fairy", "Dragon", "Rock"],
    shinyAvailable: true,
    boostedWeathers: ["snow", "windy"],
    catchCP: {
      level20: {
        min: 1791,
        max: 2042,
        label: "Level 20 (no weather boost)",
      },
      level25: {
        min: 2239,
        max: 2553,
        label: "Level 25 (Snow/Windy boost)",
      },
    },
    // This powers the dynamic hero banner
    quickSummary: {
      line1: "Kyurem is an Ice and Dragon type Legendary Pokémon in Pokémon GO.",
      line2:
        "It is weak to Fighting, Steel, Fairy, Dragon, and Rock-type moves.",
      line3:
        "Mega Lucario, Mega Rayquaza, Crowned Sword Zacian, and Eternatus are its best counters.",
    },
    summary:
      "Kyurem is a Dragon/Ice Legendary raid boss. It is weak to Dragon, Fairy, Fighting, Rock, and Steel type attacks.",
    recommendedTeam:
      "With top counters, Kyurem can be beaten by 3–4 high-level Trainers. For safety, aim for 2–5 high-level or 6–8 lower-level players.",
    recommendedCounters: [
      {
        name: "Crowned Sword Zacian",
        types: ["Fairy", "Steel"],
        fastMove: "Metal Claw",
        chargedMove: "Behemoth Blade",
        note: "Top overall counter; Steel damage exploits Kyurem’s weakness.",
      },
      {
        name: "Crowned Shield Zamazenta",
        types: ["Fighting", "Steel"],
        fastMove: "Metal Claw",
        chargedMove: "Behemoth Bash",
        note: "Very strong Steel damage with great bulk.",
      },
      {
        name: "Mega Lucario",
        types: ["Fighting", "Steel"],
        fastMove: "Force Palm",
        chargedMove: "Aura Sphere",
        note: "Massive Fighting DPS and team-boosting Mega.",
      },
      {
        name: "Dusk Mane Necrozma",
        types: ["Psychic", "Steel"],
        fastMove: "Metal Claw",
        chargedMove: "Sunsteel Strike",
        note: "Premium Steel attacker; very reliable counter.",
      },
      {
        name: "Mega Blaziken",
        types: ["Fire", "Fighting"],
        fastMove: "Counter",
        chargedMove: "Aura Sphere",
        note: "High Fighting DPS; fragile but very strong.",
      },
      {
        name: "Resolute Keldeo",
        types: ["Water", "Fighting"],
        fastMove: "Low Kick",
        chargedMove: "Secret Sword",
        note: "Strong Fighting damage with good neutral coverage.",
      },
      {
        name: "Shadow Metagross",
        types: ["Steel", "Psychic"],
        fastMove: "Bullet Punch",
        chargedMove: "Meteor Mash",
        note: "Shadow variant hits extremely hard but is frail.",
      },
      {
        name: "Mega Metagross",
        types: ["Steel", "Psychic"],
        fastMove: "Bullet Punch",
        chargedMove: "Meteor Mash",
        note: "Outstanding Steel Mega with great bulk.",
      },
      {
        name: "Eternatus",
        types: ["Poison", "Dragon"],
        fastMove: "Dragon Tail",
        chargedMove: "Dynamax Cannon",
        note: "Dragon damage exploits Kyurem’s Dragon typing.",
      },
      {
        name: "Origin Dialga",
        types: ["Steel", "Dragon"],
        fastMove: "Metal Claw",
        chargedMove: "Roar of Time",
        note: "Steel and Dragon coverage, very strong generalist.",
      },
    ],
  },
];
