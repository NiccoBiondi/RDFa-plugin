var value = "nessuna";

//Function to memorize che choice of the property made
function onChange(radio){
	
    value = radio.value;
    
	var $url = parent.tinyMCE.activeEditor.windowManager.getParams();
	
	var act = "modify";
	var request = $.ajax ({
		url: $url.arg1 + '/attribute/server/actions.php',
		type: 'POST',
		data: {action : act , property : value},
		dataType: "json"
	});
	
	request.done(function(risposta){
		//alert("tutto ok");
	});
	
	request.fail(function(risposta){
		alert("FALLITO!");
	});
	
}

