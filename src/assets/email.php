<?php

$errors = [];



switch ($_SERVER['REQUEST_METHOD']) {
    case ("OPTIONS"): //Allow preflighting to take place.
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: POST");
        header("Access-Control-Allow-Headers: content-type");
        exit;
    case ("POST"): //Send the email;
        header("Access-Control-Allow-Origin: *");

        $json = file_get_contents('php://input');

        $params = json_decode($json);

        // validate name field
        if (empty($params->name)) {
            $errors[] = ["status" => "error", "field" => "name", "msg" => "Please enter your name."];
        } else {
            $name = $params->name;
        }

        // validate email field
        if (empty($params->email)) {
            $errors[] = ["status" => "error", "field" => "email", "msg" => "Please enter your email."];
        } else {
            $email = $params->email;
        }

        // validate message field
        if (empty($params->message)) {
            $errors[] = ["status" => "error", "field" => "message", "msg" => "Please give a brief message."];
        } else {
            $message = $params->message;
        }

        if (empty($errors)) {
        
            $errors[] = ["status" => "ok"];
            
            //mail function
            $to = "zrbayoffdev@gmail.com";
            $subject = "zachbayoff.com Message";
            $headers = "From: " . $name . " " . "<".$email.">";
            
            // mail($to, $subject, $message, $headers);
            
            echo json_encode($errors);
            
        } else {
            echo json_encode($errors);
        } 

        // $recipient = 'targetInbox@exmaple.com';
        // $subject = 'new message';
        // $headers = "From: $name <$email>";

        // $response_array['status'] = 'success';
        // $response_array['from'] = $email;
        // echo json_encode($response_array);
        // echo json_encode($from_email);
        // header($response_array);

        // mail($recipient, $subject, $message, $headers);
        break;
    default: //Reject any non POST or OPTIONS requests.
        // header("Allow: POST", true, 405);
        exit;
}
