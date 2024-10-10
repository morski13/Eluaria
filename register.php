<?php
session_start();
include 'db_connect.php'; // Uključivanje fajla za povezivanje sa bazom

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT); // Hash lozinke

    // Provera da li korisničko ime već postoji
    $stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // Ako korisničko ime već postoji, obaveštava korisnika
        echo "Username already taken";
    } else {
        // Postavljanje inicijalnih vrednosti za porodicu i atribute
        $initial_family = ""; // Prazan string umesto NULL
        $initial_attributes = json_encode(new stdClass()); // Prazan JSON objekat

        // Pokušaj kreiranja novog korisnika
        $stmt = $conn->prepare("INSERT INTO users (username, password, family_choice, attributes) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $username, $password, $initial_family, $initial_attributes);

        if ($stmt->execute()) {
            // Ako je registracija uspešna, preusmerava se na customization.php
            $_SESSION['username'] = $username;
            header("Location: costumization.php");
            exit();
        } else {
            // Prikazuje tačnu SQL grešku za dijagnozu
            echo "Error during registration: " . $stmt->error;
        }
    }
}
?>
