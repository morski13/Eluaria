<?php
$servername = "localhost";  // Server je localhost
$username = "root";          // Podrazumevano korisničko ime u XAMPP-u
$password = "";              // Prazna lozinka na XAMPP-u
$dbname = "game_database";   // Ime vaše baze podataka

// Kreiranje konekcije
$conn = new mysqli($servername, $username, $password, $dbname);

// Provera konekcije
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error); // Ispis greške ako konekcija nije uspela
}
?>
