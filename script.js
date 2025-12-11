// Expanded data with more counters for better grid display
const raidData = {
    boss: {
        name: "Kyurem",
        tier: 5,
        types: ["Dragon", "Ice"],
        weaknesses: ["Fighting", "Steel", "Fairy", "Dragon", "Rock"],
        weatherBoost: ["Snow", "Windy"]
    },
    counters: [
        {
            rank: 1,
            name: "Crowned Sword Zacian",
            types: ["Fairy", "Steel"],
            fastMove: "Metal Claw",
            chargedMove: "Behemoth Blade",
            note: "Top overall counter"
        },
        {
            rank: 2,
            name: "Mega Lucario",
            types: ["Fighting", "Steel"],
            fastMove: "Force Palm",
            chargedMove: "Aura Sphere",
            note: "Massive Fighting DPS"
        },
        {
            rank: 3,
            name: "Dusk Mane Necrozma",
            types: ["Psychic", "Steel"],
            fastMove: "Metal Claw",
            chargedMove: "Sunsteel Strike",
            note: "Premium Steel attacker"
        },
        {
            rank: 4,
            name: "Mega Metagross",
            types: ["Steel", "Psychic"],
            fastMove: "Bullet Punch",
            chargedMove: "Meteor Mash",
            note: "Great bulk and damage"
        },
        {
            rank: 5,
            name: "Eternatus",
            types: ["Poison", "Dragon"],
            fastMove: "Dragon Tail",
            chargedMove: "Dynamax Cannon",
            note: "Strong Dragon attacker"
        },
        {
            rank: 6,
            name: "Crowned Shield Zamazenta",
            types: ["Fighting", "Steel"],
            fastMove: "Metal Claw",
            chargedMove: "Behemoth Bash",
            note: "Excellent bulk and damage"
        },
        {
            rank: 7,
            name: "Mega Blaziken",
            types: ["Fire", "Fighting"],
            fastMove: "Counter",
            chargedMove: "Aura Sphere",
            note: "High DPS, fragile"
        },
        {
            rank: 8,
            name: "Resolute Keldeo",
            types: ["Water", "Fighting"],
            fastMove: "Low Kick",
            chargedMove: "Secret Sword",
            note: "Strong Fighting type"
        },
        {
            rank: 9,
            name: "Shadow Metagross",
            types: ["Steel", "Psychic"],
            fastMove: "Bullet Punch",
            chargedMove: "Meteor Mash",
            note: "Extremely high damage"
        }
    ]
};

// Function to create a counter card
function createCounterCard(counter) {
    const card = document.createElement('div');
    card.className = 'counter-card';
    
    // Create the card HTML
    card.innerHTML = `
        <div class="counter-header">
            <div class="counter-name">${counter.name}</div>
            <div class="counter-rank">${counter.rank}</div>
        </div>
        
        <div class="counter-types">
            ${counter.types.map(type => 
                `<span class="type-badge ${type.toLowerCase()}">${type}</span>`
            ).join('')}
        </div>
        
        ${counter.note ? `<div class="counter-note">${counter.note}</div>` : ''}
        
        <div class="counter-moves">
            <div class="move">
                <span class="move-type">Fast</span>
                <span class="move-name">${counter.fastMove}</span>
            </div>
            <div class="move">
                <span class="move-type">Charged</span>
                <span class="move-name">${counter.chargedMove}</span>
            </div>
        </div>
    `;
    
    return card;
}

// Function to render all counters
function renderCounters() {
    const container = document.getElementById('counters-container');
    container.innerHTML = ''; // Clear existing content

    raidData.counters.forEach(counter => {
        const card = createCounterCard(counter);
        container.appendChild(card);
    });
}

// Function to update boss info dynamically
function updateBossInfo() {
    // Update boss name in header if needed
    const bossNameElement = document.querySelector('.boss-header h2');
    if (bossNameElement) {
        const tierSpan = bossNameElement.querySelector('.boss-tier');
        bossNameElement.innerHTML = `${raidData.boss.name} <span class="boss-tier">Tier ${raidData.boss.tier}</span>`;
    }
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', () => {
    updateBossInfo();
    renderCounters();
    
    // Log for debugging
    console.log(`Raid Counter Helper loaded!`);
    console.log(`Boss: ${raidData.boss.name}`);
    console.log(`Showing ${raidData.counters.length} counters in grid layout`);
});
