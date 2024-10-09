<?php
include 'db_connect.php';  // Uključuje konekcioni fajl

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];
    $password = $_POST["password"];

    // SQL upit za pronalazak korisnika
    $sql = "SELECT * FROM users WHERE username = '$username'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Korisnik pronađen, sada proveravamo lozinku
        $row = $result->fetch_assoc();
        if (password_verify($password, $row['password'])) {
            // Ako je lozinka tačna, prijava je uspešna
            session_start(); // Pokretanje sesije
            $_SESSION['username'] = $username; // Čuvanje korisničkog imena u sesiji
            header("Location: costumization.php"); // Preusmeravanje na customization.php bez dodatnih parametara
            exit();
        } else {
            echo "Incorrect password.";
        }
    } else {
        echo "User not found.";
    }

    $conn->close();
}
?>
