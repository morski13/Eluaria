<?php
// Povećajte memorijski limit ako je potrebno
ini_set('memory_limit', '512M'); // Povećava memorijski limit na 512MB

// Parametri za konekciju
$host = 'localhost'; // Server
$user = 'root';      // Korisničko ime (podrazumevano za XAMPP)
$password = '';      // Lozinka (prazno je podrazumevano za XAMPP)
$dbname = 'game_database'; // Ime baze podataka

// Konektujte se na bazu podataka
$conn = new mysqli($host, $user, $password, $dbname);

// Proverite da li je došlo do greške prilikom povezivanja
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Postavljanje charset-a
$conn->set_charset("utf8");

// Opcionalno: Podesite da PHP prikazuje greške (samo za razvojno okruženje)
error_reporting(E_ALL);
ini_set('display_errors', 1);
?>
