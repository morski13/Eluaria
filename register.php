<?php
include 'db_connect.php'; // Uključuje konekcioni fajl

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Preuzimanje korisničkog imena i lozinke iz forme
    $username = $_POST["username"];
    $password = password_hash($_POST["password"], PASSWORD_DEFAULT); // Hashovanje lozinke

    // Proverite da li korisničko ime već postoji
    $checkUserQuery = "SELECT * FROM users WHERE username = '$username'";
    $checkResult = $conn->query($checkUserQuery);

    if ($checkResult->num_rows > 0) {
        echo "Username already exists. Please choose a different one.";
    } else {
        // SQL upit za unos novog korisnika u bazu
        $sql = "INSERT INTO users (username, password) VALUES ('$username', '$password')";

        if ($conn->query($sql) === TRUE) {
            // Umesto preusmeravanja na login.html sa URL parametrom
            header("Location: login.html"); // Preusmeravanje na login.html
            exit();
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error; // Ispis greške ako unos nije uspeo
        }
    }

    // Zatvaranje konekcije
    $conn->close();
}
?>
