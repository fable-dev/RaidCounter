// Simple data structure - we'll make this more complex later
const kyuremCounters = [
    {
        name: "Crowned Sword Zacian",
        types: ["Fairy", "Steel"],
        fastMove: "Metal Claw",
        chargedMove: "Behemoth Blade"
    },
    {
        name: "Mega Lucario",
        types: ["Fighting", "Steel"],
        fastMove: "Force Palm",
        chargedMove: "Aura Sphere"
    },
    {
        name: "Dusk Mane Necrozma",
        types: ["Psychic", "Steel"],
        fastMove: "Metal Claw",
        chargedMove: "Sunsteel Strike"
    },
    {
        name: "Eternatus",
        types: ["Poison", "Dragon"],
        fastMove: "Dragon Tail",
        chargedMove: "Dynamax Cannon"
    },
    {
        name: "Mega Metagross",
        types: ["Steel", "Psychic"],
        fastMove: "Bullet Punch",
        chargedMove: "Meteor Mash"
    }
];

// Function to render counters
function renderCounters() {
    const countersList = document.getElementById('counters-list');
    countersList.innerHTML = ''; // Clear existing content

    kyuremCounters.forEach(counter => {
        const counterElement = document.createElement('div');
        counterElement.className = 'counter-item';
        
        // Create HTML for the counter
        counterElement.innerHTML = `
            <div class="counter-name">${counter.name}</div>
            <div class="counter-types">
                ${counter.types.map(type => 
                    `<span class="type-badge ${type.toLowerCase()}">${type}</span>`
                ).join('')}
            </div>
            <div class="counter-moves">
                Fast: <span>${counter.fastMove}</span>
                Charge: <span>${counter.chargedMove}</span>
            </div>
        `;
        
        countersList.appendChild(counterElement);
    });
}

// Run when page loads
document.addEventListener('DOMContentLoaded', renderCounters);

// Simple console log to show it's working
console.log("Raid Counter Helper loaded!");
console.log(`Showing ${kyuremCounters.length} counters for Kyurem`);
