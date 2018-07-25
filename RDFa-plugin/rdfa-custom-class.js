(function($){
	
	//Define variables for the dinamyc choiche
	var page = "null";//Dynamic choice of the page
	var vocabulary = "null";//Dynamic choice of the vocabulary
	
	tinymce.PluginManager.add('custom_link_class', function(editor,url){
		
		//Add listbox to choose the vocabulary
		editor.addButton('custom_listBox' , {
			type : 'listBox',
			text : 'Select the vocabulary ',
			icon : false,
			onselect : function(){
				vocabulary = this.value();
			},
			values : [
				{ text : 'Select the vocabulary', value : 'null'},
				{ text : 'Person' , value : 'Person'},
				{ text : 'Movie' , value : 'Movie'},
				{ text : 'Event' , value : 'Event'},
				{ text : 'Image Object' , value : 'ImageObject'},
				{ text : 'Recipe' , value : 'Recipe'},
				{ text : 'Resturant' , value : 'Resturant'},
				{ text : 'Sports Event' , value : 'SportsEvent'},
				{ text : 'Video Game' , value : 'VideoGame'}
			]
		});
		
		
		//Add button to add semantics
        editor.addButton('custom_button', {
            title : 'Add Semantic',
            image : url + '/add-prop.png',
            cmd: 'custom_button',
        });
		
		//Add command to the button 
		editor.addCommand('custom_button', function(){
			
			//Check if any text has been selected
			var text = editor.selection.getContent({'format' : 'html'});
			if( text.length ===0 ) {
				alert( 'Please select some text.' );
				return;
				//Check if any vocabulary has been selected
			}else if ( vocabulary == 'null' ) {
				alert( 'Please choose a vocabulary.' );
				return;
			}else{
				var node = editor.selection.getNode();
				switch (vocabulary) {
					case "Person" :
						page = url + '/attribute/person.htm';
						break;
					case "Movie" :
						page = url + '/attribute/movie.htm';
						break;
					case "Event" :
						page = url + '/attribute/event.htm';
						break;
					case "ImageObject" :
						page = url + '/attribute/imageObject.htm';
						break;
					case "Recipe" :
						page = url + '/attribute/recipe.htm';
						break;
					case "Resturant" :
						page = url + '/attribute/resturant.htm';
						break;
					case "SportsEvent" :
						page = url + '/attribute/sportsEvent.htm';
						break;
					case "VideoGame" :
						page = url + '/attribute/videoGame.htm';
						break;
				}
				//Add the vocaboary to the <p> tag
				$(node).attr({ vocab : 'http://schema.org/' , typeOf : vocabulary });
			}
			
			//Open the dialog window to choose the property
			editor.windowManager.open({
				title : 'Property',
				url : page,
				width : 500,
				height : 360,
				buttons : [
					//Define ok button to save the chosen property
					{type : 'button',
					 text : 'Ok',
					 onclick : function() {
						  var act = "take";
						  var request = $.ajax({
							 url : url + '/attribute/server/actions.php',
							  type : "POST",
							  data : {action : act},
							  dataType : "json"
						  });
						  
						  request.done(function(risposta){
							  
							  var property = risposta["property"];
							  //Check if a property has been selected
							  if(property == "nessuna"){
								  alert( 'Please select a property' );
								  return;
							  }else{
								  //Check if the property is a url
								  if(property != "url" ){
									  
									  editor.execCommand('mceReplaceContent', false, '<span property="' + property + '" >' + text + '</span>');
									  
								  }else{ 
									  //Ask to insert url
									  var result = prompt('Enter the link');
									  if( !result ){
										  //User exit
										  return;
									  }else if(result.length === 0){
										  //User not insert the url
										  return;
									  }else{
										  
										  editor.execCommand('mceReplaceContent', false, '<a property="' + property + '" href=http://' + result + '>' + text + '</a>');
										  
									  }
								  }
							  }
						  });
						  
						  request.fail(function(){
							  alert('Richiesta fallita');
							  
						  });
						   
						 parent.tinyMCE.activeEditor.windowManager.close(this);
						  
					  }
					},
					//Add cancel button to abort
					{type : 'button',
					 text : 'Close',
					 onclick : function() {
						 var act ="close";
						 var request = $.ajax({
							 url : url + '/attribute/server/actions.php',
							 type : "POST",
							 data : {action : act},
							 dataType : "json"
						 });
						 request.done(function(){});
						 request.fail(function(){
							alert('Fallimento'); 
						 });
						 parent.tinyMCE.activeEditor.windowManager.close(this);
						 
					 }	
					}
				]
			},{
				arg1 : url
			});
			
		});
		
		
	});
	
	
	
	
})(jQuery);