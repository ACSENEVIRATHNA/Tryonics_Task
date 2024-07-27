<?php
include 'db.php';

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (isset($data['name'], $data['about'], $data['birthday'], $data['mobile'], $data['email'], $data['country'])) {
    $name = $data['name'];
    $about = $data['about'];
    $birthday = $data['birthday'];
    $mobile = $data['mobile'];
    $email = $data['email'];
    $country = $data['country'];

    $sql = "INSERT INTO users (name, about, birthday, mobile, email, country)
    VALUES ('$name', '$about', '$birthday', '$mobile', '$email', '$country')";

    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
} else {
    echo "Error: Required fields are missing.";
}

$conn->close();
?>
