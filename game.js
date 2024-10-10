// Mape za slike likova prema porodici
const characterImages = {
    alderians: 'likovi/alderians_output-onlinegiftools.gif',
    ignishearts: 'likovi/ignihearts_output-onlinegiftools.gif',
    stonewells: 'likovi/stonecutter_output-onlinegiftools.gif',
    deepwaters: 'likovi/deepwaters1_output-onlinegiftools.gif'
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

// Funkcija za ažuriranje karaktera i atributa
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
        <p>Health: <span id="healthText">${attributes.health}</span></p>
        <p>Mana: <span id="manaText">${attributes.mana}</span></p>
        <p>Strength: <span id="strengthText">${attributes.strength}</span></p>
        <p>Speed: <span id="speedText">${attributes.speed}</span></p>
        <p>Luck: <span id="luckText">${attributes.luck}</span></p>
        <p>Intelligence: <span id="intelligenceText">${attributes.intelligence}</span></p>
        <p>Stealth: <span id="stealthText">${attributes.stealth}</span></p>
    `;

    // Ažuriraj health bar
    const healthMeter = document.getElementById('healthMeter');
    const healthPercentage = (attributes.health / 120) * 100; // 120 je maksimalno zdravlje
    healthMeter.style.width = `${healthPercentage}%`; // Ažuriraj širinu health bara

    // Ažuriraj mana bar
    const manaMeter = document.getElementById('manaMeter');
    const manaPercentage = (attributes.mana / 100) * 100; // 100 je maksimalna mana
    manaMeter.style.width = `${manaPercentage}%`; // Ažuriraj širinu mana bara
}

// Doda event listener za dugme Choose
document.getElementById('chooseButton').addEventListener('click', function() {
    const family = document.getElementById('family').value; // Izabrana porodica
    const attributes = familyAttributes[family]; // Atributi porodice

    // Slanje podataka na server putem POST metode
    fetch('save_character.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            family: family,
            attributes: attributes
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Character saved successfully!');
            window.location.href = 'game_map.php'; // Preusmeravanje na stranicu mape igre
        } else {
            alert('Error saving character: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

// Doda event listener za promenu selektora porodice
document.getElementById('family').addEventListener('change', updateCharacter);

// Inicijalno ažuriranje karaktera pri učitavanju stranice
window.onload = function() {
    updateCharacter(); // Ažuriraj karakter pri učitavanju stranice
};
