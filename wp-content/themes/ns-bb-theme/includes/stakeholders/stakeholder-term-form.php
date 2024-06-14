<?php

namespace NobleStudios\stakeholders\termFields;

add_action( 'init', __NAMESPACE__ . '\add_term_fields', 99 );

function add_term_fields() {
    new \NobleStudios\adminForms\term_form([
        'taxonomy' => 'stakeholder_cat',
        'fields' => array(
            \NobleStudios\adminForms\term_form::$TERM_THUMB,
        ),
    ]);
}