<?php
/**
 * Plugin Name: RDFa plugin
 * Plugin URI: http://www.github.com/NiccoBio
 * Version: 1.0
 * Author: Niccolò Biondi
 * Author URI: http://www.github.com/NiccoBio
 * Description: A simple RDFa plugin to add semantic to the page 
 * License: GPL2
 */

 class RDFa_custom_class {
	 
	 //Constructor. Called when the plugin is initialised.
    function __construct() {
        if( is_admin() ) {
             
            add_action( 'init' , array($this,'setup_rdfa_plugin'));
            
        }
    }
     
	 
	 //Check if the current user can edit Posts or Pages, and is using the Visual Editor
	 //If so, add some filters so we can register our plugin
     function setup_rdfa_plugin(){
         
         // Check if the logged in WordPress User can edit Posts or Pages
		 // If not, don't register our TinyMCE plugin
         if ( !current_user_can('edit_posts') && !current_user_can ('edit_pages')) {
            return;
         }
         
         // Check if the logged in WordPress User has the Visual Editor enabled
		 // If not, don't register our TinyMCE plugin 
         if ( get_user_option('rich_editing') !== 'true' ) {
             return;
         }
         wp_enqueue_script('jquery');
         //Setup some filter
         add_filter('mce_external_plugins', array( &$this, 'add_rdfa_plugin'));
         add_filter('mce_buttons', array( &$this, 'add_rdfa_toolbar_button'));
     }
	 
     
	 
 	//Adds a TinyMCE plugin compatible JS file to the TinyMCE / Visual Editor instance
 	//@param array $plugin_array Array of registered TinyMCE Plugins
 	//@return array Modified array of registered TinyMCE Plugins
     function add_rdfa_plugin ($plugin_array) {
         $plugin_array['custom_link_class'] = plugin_dir_url( __FILE__ ) . 'rdfa-custom-class.js';
         return $plugin_array;
     }
     
	// Adds a button to the TinyMCE / Visual Editor which the user can click
 	//to insert a link with a custom CSS class.
 	//@param array $buttons Array of registered TinyMCE Buttons
 	//@return array Modified array of registered TinyMCE Buttons

     function add_rdfa_toolbar_button( $buttons ) {
         array_push( $buttons, '|', 'custom_listBox','custom_button' );
         return $buttons;
     }

 }

$rdfa_custom_class = new RDFa_custom_class;
?>