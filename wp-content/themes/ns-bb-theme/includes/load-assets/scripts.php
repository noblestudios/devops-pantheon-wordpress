<?php

namespace NobleStudios\loadAssets\scripts;

define( 'THEME_SCRIPTS_URL', get_template_directory_uri() . '/build/scripts/' );


// front end scripts
function enqueue_scripts() {

    wp_register_script(
      'noble-script-admin',
      THEME_SCRIPTS_URL . 'admin.js',
      [],
      THEME_VERSION,
      true
  );

  wp_enqueue_script('noble-script-admin');

}

add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\enqueue_scripts' );



// admin scripts

function enqueue_admin_scripts() {
    wp_enqueue_script( 'noble-admin', THEME_SCRIPTS_URL . 'admin.js', [], THEME_VERSION, true );
    wp_enqueue_script( 'ns-admin-forms', THEME_SCRIPTS_URL . 'admin-forms.js', ['media'], THEME_VERSION, true );
    wp_enqueue_style( 'ns-admin-forms-css', THEME_STYLE_URL . 'admin-forms.css', [], THEME_VERSION );

}

add_action( 'admin_enqueue_scripts', __NAMESPACE__ . '\enqueue_admin_scripts' );

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\block_scripts', 99 );

function block_scripts() {
    if( is_admin() ) {
        wp_enqueue_script( 'ns-block-scripts', THEME_SCRIPTS_URL . 'blockEditorHooks.js', [], THEME_VERSION, true );
    }
}



?>
