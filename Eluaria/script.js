// Kontrola zvuka
const backgroundMusic = document.getElementById('backgroundMusic');
const playMusicButton = document.getElementById('playMusic');
const soundIcon = document.getElementById('soundIcon');

let isPlaying = false;

// Funkcija za prebacivanje zvuka
playMusicButton.addEventListener('click', () => {
    if (isPlaying) {
        backgroundMusic.pause();
        soundIcon.src = 'ikone/sound-off-8bit.png'; // Promena ikone na isključeno
    } else {
        backgroundMusic.play();
        soundIcon.src = 'ikone/sound-on-8bit.png'; // Promena ikone na uključeno
    }
    isPlaying = !isPlaying;
});

// Validacija forme za login
document.getElementById('loginForm').addEventListener('submit', function(event) {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === '' || password === '') {
        event.preventDefault(); // Spreči slanje forme
        document.getElementById('errorMessage').innerText = 'Please fill in all fields.'; // Prikaz poruke o grešci
    } else {
        // Kada se forma validira, preusmeravanje će biti na login.php
        this.action = 'login.php';
    }
});

// Validacija forme za registraciju
document.getElementById('registerForm').addEventListener('submit', function(event) {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === '' || password === '') {
        event.preventDefault(); // Spreči slanje forme
        document.getElementById('errorMessage').innerText = 'Please fill in all fields.'; // Prikaz poruke o grešci
    } else {
        // Kada se forma validira, preusmeravanje će biti na register.php
        this.action = 'register.php';
    }
});

// Opcionalno: Preusmeravanje na customization.php nakon uspešne prijave/registracije
window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('login') && urlParams.get('login') === 'success') {
        window.location.href = 'costumization.php'; // Preusmerava na customization.php nakon uspešne prijave
    }
    if (urlParams.has('register') && urlParams.get('register') === 'success') {
        window.location.href = 'costumization.php'; // Preusmerava na customization.php nakon uspešne registracije
    }
};
