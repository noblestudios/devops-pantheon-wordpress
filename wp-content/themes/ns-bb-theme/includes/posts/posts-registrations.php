<?php

namespace NobleStudios\posts\registrations;

add_action( 'init', __NAMESPACE__ . '\register_cat_meta', 0 );

function register_cat_meta(){

    register_term_meta( 'category', 'term_thumb_id', [
        'type' => 'integer',
        'default' => 0,
        'show_in_rest' => true,
        'single' => true,
    ] );
}
