<?php

    /* set the answer format */
    header('Content-Type: text/json');
	
	$cookie_value = "nessuna";
	//Create a cookie to save the chosen property 
	setcookie('property', $cookie_value, time() + (86400 * 30), "/");
	//Take the action
	$action = $_POST["action"];
	

	switch ($action) {
		case "modify":
			//Save property
			modifyProperty();
			break;
		case "take":
			//Take the saved property
			takeProperty();
			break;
		case "close" :
			//Delete the cookie
			deleteCookie();
			break;
	}
	
	 
	function modifyProperty(){	
		$cookie_value = $_POST["property"];
		setcookie('property', $cookie_value, time() + (86400 * 30), "/");
		$val = $_COOKIE["property"];
		$risposta = array('property' => $val);
		echo json_encode($risposta);
	}
	
	
	function takeProperty(){
		$property = $_COOKIE["property"];
		$risposta = array('property' => $property);
		unset($_COOKIE["property"]);
		echo json_encode($risposta);
	}

	function deleteCookie(){
		unset($_COOKIE["property"]);
		echo json_encode();
	}

?>