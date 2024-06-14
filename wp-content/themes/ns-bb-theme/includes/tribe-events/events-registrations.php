<?php

namespace NobleStudios\events\registrations;

add_action( 'init', __NAMESPACE__ . '\register_meta', 0 );

function register_meta(){

    register_post_meta( 'tribe_events', 'slide_image_1', [
        'type' => 'string',
        'single' => true,
        'show_in_rest' => true
    ] );

    register_post_meta( 'tribe_events', 'slide_image_2', [
        'type' => 'integer',
        'single' => true,
        'show_in_rest' => true
    ] );

    register_post_meta( 'tribe_events', 'slide_image_3', [
        'type' => 'integer',
        'single' => true,
        'show_in_rest' => true
    ] );

    register_post_meta( 'tribe_events', 'slide_image_4', [
        'type' => 'integer',
        'single' => true,
        'show_in_rest' => true
    ] );

    register_post_meta( 'tribe_events', 'slide_image_5', [
        'type' => 'integer',
        'single' => true,
        'show_in_rest' => true
    ] );

    register_post_meta( 'tribe_events', 'slide_image_6', [
        'type' => 'integer',
        'single' => true,
        'show_in_rest' => true
    ] );

    register_term_meta( 'tribe_events_cat', 'term_thumb_id', [
        'type' => 'integer',
        'default' => 0,
        'show_in_rest' => true,
        'single' => true,
    ] );
}
