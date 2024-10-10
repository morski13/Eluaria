<?php
session_start();
include 'db_connect.php';

// Provera da li je korisnik prijavljen
if (!isset($_SESSION['username'])) {
    header("Location: login.html"); // Ako nije prijavljen, vraća ga na login
    exit();
}

$username = $_SESSION['username']; // Uzimanje korisničkog imena iz sesije

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $family = $_POST['family'];
    $attributes = json_encode($_POST['attributes']); // Pretvaranje atributa u JSON

    // Ažuriranje korisničkih podataka sa porodicom i atributima
    $stmt = $conn->prepare("UPDATE users SET family_choice = ?, attributes = ? WHERE username = ?");
    $stmt->bind_param("sss", $family, $attributes, $username);

    if ($stmt->execute()) {
        // Nakon izbora porodice i atributa prebacuje se na game_map.php
        header("Location: game_map.php");
        exit();
    } else {
        echo "Error saving character";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Character Customization</title>
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
    <!-- Custom CSS -->
    <link rel="stylesheet" href="character.css">
</head>
<body>
    <div class="container">
        <div class="welcome-section">
            <h1>Welcome, <?php echo htmlspecialchars($username); ?>!</h1>
            <div class="character-frame">
                <div class="character-preview" id="characterPreview">
                    <img id="characterImage" src="likovi/alderians_output-onlinegiftools.gif" alt="Character Preview">
                </div>
            </div>
            <div class="options">
                <h2>Choose Your Family</h2>
                <div class="option">
                    <label for="family">Choose Family:</label>
                    <select id="family">
                        <option value="alderians">The Alderians</option>
                        <option value="ignishearts">The Ignishearts</option>
                        <option value="stonewells">The Stonewells</option>
                        <option value="deepwaters">The Deepwaters</option>
                    </select>
                </div>
            </div>
        </div>

        <!-- Desna strana: Attributes -->
        <div class="attributes-section">
            <h2>Attributes</h2>
            <div id="attributeDisplay">
                <p>Health: <span id="healthText">100</span></p>
                <p>Mana: <span id="manaText">100</span></p>
                <p>Strength: <span id="strengthText">70</span></p>
                <p>Speed: <span id="speedText">60</span></p>
                <p>Luck: <span id="luckText">50</span></p>
                <p>Intelligence: <span id="intelligenceText">80</span></p>
                <p>Stealth: <span id="stealthText">40</span></p>
            </div>

            <!-- Health Bar -->
            <div class="health-bar">
                <label>Health:</label>
                <div class="health-meter" id="healthMeter" style="width: 100%;"></div>
            </div>

            <!-- Mana Bar -->
            <div class="mana-bar">
                <label>Mana:</label>
                <div class="mana-meter" id="manaMeter" style="width: 100%;"></div>
            </div>

            <!-- Dugme Choose ispod atributa -->
            <button id="chooseButton">Choose</button> <!-- Dugme za izbor -->
        </div>
    </div>

    <!-- JavaScript -->
    <script src="game.js"></script>
</body>
</html>
