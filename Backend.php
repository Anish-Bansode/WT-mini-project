<?php
    $id = $_POST["id"];
    $pass = $_POST["pass"];

    $con = new mysqli("localhost", "root", "", "login");

    if(!$con) {
        die("failed to connect: " . $con->connect_error);
    } else {
        $stmt = $con->prepare("SELECT * FROM emp WHERE Id = ?");
        $stmt->bind_param("s", $id);
        $stmt->execute();
        $stmt_result = $stmt->get_result();

        if($stmt_result->num_rows > 0 ) {
            $data = $stmt_result->fetch_assoc();
            if($data['password'] === $pass) {
                echo "Login Successfully";
            } else {
                //$error = "Invalid Password";
                echo "Invalid ID";
            }
        } else {
            echo "Invalid ID";
           // $error = "Invalid Password";
        
        }


        // Close the statement after fetching data
        $stmt->close();
    }

    // Close the database connection
    $con->close();
?>


