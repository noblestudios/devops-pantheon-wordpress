<?php

namespace NobleStudios\tribe\termFields;

add_action( 'init', __NAMESPACE__ . '\add_term_fields', 99 );

function add_term_fields() {
    new \NobleStudios\adminForms\term_form([
        'taxonomy' => 'tribe_events_cat',
        'fields' => array(
            \NobleStudios\adminForms\term_form::$TERM_THUMB,
        ),
    ]);
}
