<?php
if (isset($_POST['email'])) {
  $email = $_POST['email'];
  $to = 'info@where-at.io';
  $subject = 'New email for subscription';
  $msg = "{$email} is added.";
  $headers  = "From: noreply@where-at.io <noreply@where-at.io>\r\n";
  // $headers .= "Cc: testsite <mail@testsite.com>\n"; 
  $headers .= "X-Sender: testsite <mail@testsite.com>\n";
  //   $headers .= 'X-Mailer: PHP/' . phpversion();
  $headers .= "X-Priority: 1\n"; // Urgent message!
  // $headers .= "Return-Path: mail@testsite.com\n"; // Return path for errors
  $headers .= "MIME-Version: 1.0\r\n";
  $headers .= "Content-Type: text/html; charset=iso-8859-1\n";

  if (mail($to, $subject, $msg, $headers)) {
    echo json_encode(true);
  } else {
    echo json_encode(false);
  }
  
  exit;
}
