<?php
session_start();
include 'db_connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (!isset($_SESSION['username'])) {
        echo json_encode(['success' => false, 'message' => 'User not logged in.']);
        exit();
    }

    $username = $_SESSION['username'];
    $data = json_decode(file_get_contents("php://input"), true);
    $family = $data['family'];
    $attributes = json_encode($data['attributes']);

    // Ažuriranje korisničkih podataka
    $sql = "UPDATE users SET family_choice = ?, attributes = ? WHERE username = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('sss', $family, $attributes, $username);

    if ($stmt->execute()) {
        echo json_encode(['success' => true]); // Uspešno sačuvano
    } else {
        echo json_encode(['success' => false, 'message' => $conn->error]); // Greška
    }

    $stmt->close();
    $conn->close();
}
?>
