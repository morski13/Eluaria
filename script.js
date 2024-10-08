// Funkcija za reprodukciju muzike kada se dugme pritisne
document.getElementById('playMusic').addEventListener('click', function() {
    const backgroundMusic = document.getElementById('backgroundMusic');
    const soundIcon = document.getElementById('soundIcon');

    // Proveri da li je muzika već puštena
    if (backgroundMusic.paused) {
        backgroundMusic.play().catch(error => {
            console.log("Playback failed: ", error);
        });
        // Promeni ikonu na zvuk uključen
        soundIcon.src = "ikone/sound-on-8bit.png"; // Putanja do slike zvuka uključen
    } else {
        backgroundMusic.pause();
        // Promeni ikonu na zvuk isključen
        soundIcon.src = "ikone/sound-off-8bit.png"; // Putanja do slike zvuka isključen
    }
});

// Dodaj event listener za formu
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Sprečava podnošenje forme

    // Dohvati vrednosti unetih podataka
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Provera unosa (možeš dodati svoju logiku za autentifikaciju)
    if (username === 'player1' && password === 'tadija123') {
        // Preusmeri na stranicu za personalizaciju
        window.location.href = 'costumization.html'; // Putanja do customization.html
    } else {
        // Prikazi poruku o grešci
        document.getElementById('errorMessage').textContent = 'Invalid username or password!';
    }
});

