<?php
include 'db.php';

$input = file_get_contents('php://input');
$data = json_decode($input, true);

$id = $data['id'];
$name = $data['name'];
$about = $data['about'];
$birthday = $data['birthday'];
$mobile = $data['mobile'];
$email = $data['email'];
$country = $data['country'];

$sql = "UPDATE users SET name='$name', about='$about', birthday='$birthday', mobile='$mobile', email='$email', country='$country' WHERE id=$id";


if ($conn->query($sql) === TRUE) {
    echo "Record Updated successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>

