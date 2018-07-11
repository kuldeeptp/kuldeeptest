<?php
/**
 * Created by PhpStorm.
 * User: tekmint
 * Date: 20/07/16
 * Time: 10:16 PM
 */

$to = 'kuldeep.pal@gmail.com';
$subject = "New Content Notification";

$htmlContent =<<<EX
    <html>
    <head>
        <title>Welcome to CodexWorld</title>
    </head>
    <body>
        <h1>Thanks you for joining with us!</h1>
        <table cellspacing="0" style="border: 2px dashed #FB4314; width: 300px; height: 200px;">
            <tr>
                <th>Name:</th><td>CodexWorld</td>
            </tr>
            <tr style="background-color: #e0e0e0;">
                <th>Email:</th><td>contact@codexworld.com</td>
            </tr>
            <tr>
                <th>Website:</th><td><a href="http://www.codexworld.com">www.codexworld.com</a></td>
            </tr>
        </table>
    </body>
    </html>
EX;
// Set content-type header for sending HTML email
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

// Additional headers
$headers .= 'From: CodexWorld<info@codexworld.com>' . "\r\n";
$headers .= 'Cc: welcome@example.com' . "\r\n";
$headers .= 'Bcc: welcome2@example.com' . "\r\n";

// Send email
if(mail($to,$subject,$htmlContent,$headers)):
    $successMsg = 'Email has sent successfully.';
else:
    $errorMsg = 'Email sending fail.';
endif;
?>