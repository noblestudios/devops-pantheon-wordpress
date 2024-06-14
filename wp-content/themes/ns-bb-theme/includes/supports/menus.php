<?php

//namespace NobleStudios\supports\menus;

add_action('after_setup_theme', function() {
    register_nav_menus( array(
      'primary-nav' => 'Primary',
      'secondary-nav' => 'Secondary',
      'footer' => 'Footer',
    ));
});
