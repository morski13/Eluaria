<?php
session_start();
include 'db_connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Provera korisničkog imena i lozinke
    $stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    if ($user && password_verify($password, $user['password'])) {
        $_SESSION['username'] = $username;

        // Provera da li je korisnik izabrao porodicu i atribute
        if ($user['family_choice'] && $user['attributes']) {
            // Ako su porodica i atributi već izabrani, prebacuje se na game_map.php
            header("Location: game_map.php");
        } else {
            // Ako porodica i atributi nisu izabrani, prebacuje se na customization.php
            header("Location: costumization.php");
        }
        exit();
    } else {
        // Neuspešna prijava
        echo "Invalid username or password";
    }
}
?>
