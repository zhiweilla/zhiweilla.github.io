<?php
    if(isset($_GET["lang"])) {
        $lang = $_GET["lang"];
        if($lang !== "s") {
            header("Content-type: text/plain; charset=UTF-8");
            echo get_file($lang);
        } else {
            handle_request_error("you must choose language first");
        }
    } else {
        handle_request_error("you must choose language first!");
    }

    function get_file($lang) {
        return file_get_contents("intros/" . $lang . ".txt");
    }

    /**
     * sends back a message to inform client with the request error.
     * @param string the message t show the result.
     */
    function handle_request_error($msg) {
        header("HTTP/1.1 400 Service Unavailable");
        header("Content-Type: application/json");
        $result = json_encode(array("error" => $msg));
        die($result);
    }

?>