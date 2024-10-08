// Mape za slike likova prema porodici
const characterImages = {
    alderians: 'likovi/alderians_output-onlinegiftools.gif', // Zamenite sa stvarnim putanjama
    ignishearts: 'likovi/ignihearts_output-onlinegiftools.gif', // Zamenite sa stvarnim putanjama
    stonewells: 'likovi/stonecutter_output-onlinegiftools.gif', // Zamenite sa stvarnim putanjama
    deepwaters: 'likovi/deepwaters1_output-onlinegiftools.gif' // Zamenite sa stvarnim putanjama
};

// Mape za atribute prema porodici
const familyAttributes = {
    alderians: {
        health: 120,
        mana: 80,
        strength: 70,
        speed: 60,
        luck: 50,
        intelligence: 90,
        stealth: 40
    },
    ignishearts: {
        health: 100,
        mana: 100,
        strength: 80,
        speed: 70,
        luck: 60,
        intelligence: 50,
        stealth: 80
    },
    stonewells: {
        health: 110,
        mana: 70,
        strength: 75,
        speed: 65,
        luck: 55,
        intelligence: 60,
        stealth: 50
    },
    deepwaters: {
        health: 90,
        mana: 90,
        strength: 60,
        speed: 80,
        luck: 75,
        intelligence: 40,
        stealth: 85
    }
};

// Funkcija za ažuriranje prikaza karaktera
function updateCharacter() {
    const selectedFamily = document.getElementById('family').value; // Dohvati izabranu porodicu
    const characterImage = document.getElementById('characterImage');
    
    // Ažuriraj izvor slike na osnovu izabrane porodice
    characterImage.src = characterImages[selectedFamily];

    // Ažuriraj atribute
    updateAttributes(selectedFamily);
}

// Funkcija za ažuriranje atributa
function updateAttributes(family) {
    const attributes = familyAttributes[family]; // Uzmi atribute za izabranu porodicu

    // Ažuriraj prikazane atribute
    document.getElementById('attributeDisplay').innerHTML = `
        <div style="margin-bottom: 20px;">Health: ${attributes.health}</div>
        <div style="margin-bottom: 20px;">Mana: ${attributes.mana}</div>
        <div style="margin-bottom: 20px;">Strength: ${attributes.strength}</div>
        <div style="margin-bottom: 20px;">Speed: ${attributes.speed}</div>
        <div style="margin-bottom: 20px;">Luck: ${attributes.luck}</div>
        <div style="margin-bottom: 20px;">Intelligence: ${attributes.intelligence}</div>
        <div style="margin-bottom: 20px;">Stealth: ${attributes.stealth}</div>
    `;

    // Ažuriraj health bar
    const healthMeter = document.getElementById('healthMeter');
    const healthText = document.getElementById('healthText');
    const healthPercentage = (attributes.health / 120) * 100; // 120 je maksimalno zdravlje
    healthMeter.style.width = `${healthPercentage}%`; // Ažuriraj širinu health bara
    healthText.innerText = attributes.health; // Prikazuj trenutnu vrednost zdravlja
    healthMeter.style.backgroundColor = healthPercentage > 50 ? 'green' : 'red'; // Zeleni ako je više od 50%, crveni inače

    // Ažuriraj mana bar
    const manaMeter = document.getElementById('manaMeter');
    const manaText = document.getElementById('manaText');
    const manaPercentage = (attributes.mana / 100) * 100; // 100 je maksimalna mana
    manaMeter.style.width = `${manaPercentage}%`; // Ažuriraj širinu mana bara
    manaText.innerText = attributes.mana; // Prikazuj trenutnu vrednost mane
    manaMeter.style.backgroundColor = manaPercentage > 50 ? 'blue' : 'orange'; // Plavo ako je više od 50%, narandžasto inače
}

// Doda event listener za promenu selektora porodice
document.getElementById('family').addEventListener('change', updateCharacter);

// Inicijalno ažuriranje karaktera
window.onload = function() {
    updateCharacter(); // Ažuriraj karakter pri učitavanju stranice
};
