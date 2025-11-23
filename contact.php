<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $firstName = htmlspecialchars($_POST["firstName"]);
    $fullName = htmlspecialchars($_POST["fullName"]);
    $address = htmlspecialchars($_POST["address"]);
    $email = htmlspecialchars($_POST["email"]);
    $phone = htmlspecialchars($_POST["phone"]);
    $websiteType = htmlspecialchars($_POST["websiteType"]);

    $to = "aliaa10045@gmail.com"; // change to your email
    $subject = "New Website Inquiry from $fullName";
    $message = "
    Name: $firstName
    Full Name: $fullName
    Address: $address
    Email: $email
    Phone: $phone
    Website Type: $websiteType
    ";

    $headers = "From: $email\r\n";

    if (mail($to, $subject, $message, $headers)) {
        echo "Thank you! Your message has been sent.";
    } else {
        echo "Sorry, something went wrong. Please try again.";
    }
}
?>
