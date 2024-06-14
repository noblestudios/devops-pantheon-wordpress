<?php
//Load styles + scripts for custom code on core blocks
namespace NobleStudios\loadAssets\core;

//Embed style
wp_enqueue_block_style('core/embed', [
    'src' => THEME_STYLE_URL . 'blocks/embed.css'
]);

//Embed scripts
add_action('wp_enqueue_scripts', function() {
    if(has_block('core/embed')) {
		wp_enqueue_script('embed-custom', THEME_SCRIPT_URL . 'blocks/embed.js');
	}
});

//Image style
wp_enqueue_block_style('core/image', [
    'src' => THEME_STYLE_URL . 'blocks/image.css'
]);
