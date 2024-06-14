<?php

namespace NobleStudios\events\metabox;

add_action( 'init', __NAMESPACE__ . '\add_media_fields', 99 );

function add_media_fields() {

    new \NobleStudios\adminForms\post_form([
        'post_type' => 'tribe_events',
        'box_title' => 'Slide Images',
        'box_id' => 'events-slides',
        'fields' => array(
            array(
                'name' => 'slide_image_1',
                'label' => 'Image 1',
                'type' => 'image',
            ),
            array(
                'name' => 'slide_image_2',
                'label' => 'Image 2',
                'type' => 'image',
            ),
            array(
                'name' => 'slide_image_3',
                'label' => 'Image 3',
                'type' => 'image',
            ),
            array(
                'name' => 'slide_image_4',
                'label' => 'Image 4',
                'type' => 'image',
            ),
            array(
                'name' => 'slide_image_5',
                'label' => 'Image 5',
                'type' => 'image',
            ),
            array(
                'name' => 'slide_image_6',
                'label' => 'Image 6',
                'type' => 'image',
            ),
        ),
    ]);

    new \NobleStudios\adminForms\post_form([
        'post_type' => 'tribe_events',
        'box_title' => 'Social Links',
        'box_id' => 'events-socials',
        'fields' => array(
            array(
                'name' => 'event_facebook',
                'label' => 'Facebook',
                'type' => 'text',
                'size' => 'full'
            ),
            array(
                'name' => 'event_google',
                'label' => 'Google',
                'type' => 'text',
                'size' => 'full'
            ),
            array(
                'name' => 'event_youtube',
                'label' => 'Youtube',
                'type' => 'text',
                'size' => 'full'
            ),
            array(
                'name' => 'event_linkedin',
                'label' => 'LinkedIn',
                'type' => 'text',
                'size' => 'full'
            ),
            array(
                'name' => 'event_instagram',
                'label' => 'Instagram',
                'type' => 'text',
                'size' => 'full'
            ),
            array(
                'name' => 'event_twitter',
                'label' => 'Twitter',
                'type' => 'text',
                'size' => 'full'
            ),
            array(
                'name' => 'event_vimeo',
                'label' => 'Vimeo',
                'type' => 'text',
                'size' => 'full'
            ),
        ),
    ]);
}
