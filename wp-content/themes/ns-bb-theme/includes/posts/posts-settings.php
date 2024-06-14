<?php

namespace NobleStudios\posts\settings;

const GROUP_SLUG = 'ns-post-options';

add_action( 'init', __NAMESPACE__ . '\add_options_page' );

function add_options_page() {

    new \NobleStudios\adminForms\settings_form( array(
        'parent_slug' => 'edit.php',
        'page_title' => 'Posts Settings',
        'menu_title' => 'Posts Settings',
        'menu_slug' => GROUP_SLUG,
        'position' => 50,
        'fields' => array(
            array(
                'type' => 'title',
            ),
            array(
                'label' => 'Fallback Image',
                'name' => 'ns_post_default_image',
                'option' => 'ns_post_default_image',
                'type' => 'image',
                'help' => 'Sets the fallback featured image if no image is set at the post or term level.'
            ),
            array(
                'type' => 'sectionend',
            ),
        ),
    ) );
}

add_action( 'init',  __NAMESPACE__ . '\register_settings' );

function register_settings(){

    register_setting( GROUP_SLUG, 'ns_post_default_image', [
        'type' => 'integer',
        'show_in_rest' => false,
        'default' => 0
    ] );
}
