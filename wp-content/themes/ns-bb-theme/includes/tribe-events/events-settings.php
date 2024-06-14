<?php

namespace NobleStudios\tribe\settings;

const GROUP_SLUG = 'ns-events-options';

add_action( 'init', __NAMESPACE__ . '\add_options_page' );

function add_options_page() {

    new \NobleStudios\adminForms\tribe_settings_form( array(
        'tab_id' => GROUP_SLUG,
        'tab_label' => 'Theme Options',
        'position' => 99999900,
        'fields' => array(
            array(
                'type' => 'title',
                'title' => 'Theme Settings'
            ),
            array(
                'label' => 'Fallback Image',
                'name' => 'ns_event_default_image',
                'option' => 'ns_event_default_image',
                'type' => 'image',
                'help' => 'Sets the fallback featured image if no image is set at the event or term level.'
            ),
            array(
                'type' => 'sectionend',
            ),
        ),
    ) );
}

add_action( 'init',  __NAMESPACE__ . '\register_settings' );

function register_settings(){

    register_setting( GROUP_SLUG, 'ns_event_default_image', [
        'type' => 'integer',
        'show_in_rest' => false,
        'default' => 0
    ] );
}
