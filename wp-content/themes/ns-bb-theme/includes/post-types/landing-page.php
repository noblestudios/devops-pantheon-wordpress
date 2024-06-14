<?php

namespace NobleStudios\registrations\landingPages;

add_action( 'init', __NAMESPACE__ . '\register_landing_page_type', 10 );

function register_landing_page_type() {

    register_post_type( 'landing', array(
        'labels' => array(
            'name' => 'Landing Page',
            'singular_name' => 'Landing Page',
            'add_new_item' => 'Add New Landing Page',
            'all_items' => 'All Landing Pages',
            'edit_item' => 'Edit Landing Page',
            'add_new' => 'Add Landing Page',
        ),
        'public' => true,
        'exclude_from_search' => false,
        'publicly_queryable' => true,
        'show_ui' => true,
        'show_in_menu' => true,
        'show_in_rest' => true,
        'query_var' => true,
        'rewrite' => array(
            'with_front' => false,
        ),
        'capability_type' => 'post',
        'has_archive' => false,
        'hierarchical' => false,
        'supports' => array(
            'title',
            'thumbnail',
            'editor',
            'revisions',
            'custom-fields',
            'excerpt'
        ),
    ) );
}

add_action( 'init', __NAMESPACE__ . '\register_stakeholder_meta', 10 );

function register_stakeholder_meta() {

    register_post_meta( 'landing', 'navLogo', [
        'type' => 'integer',
        'single' => true,
        'show_in_rest' => true
    ] );

    register_post_meta( 'landing', 'navCTALink', [
        'type' => 'object',
        'single' => true,
        'show_in_rest' => array(
            'schema' => array(
                'type' => 'object',
                'properties' => array(
                    'url' => array(
                        'type' => 'string',
                    ),
                    'opensInNewTab' => array(
                        'type' => 'boolean',
                    ),
                    'id' => array(
                        'type' => 'integer'
                    ),
                    'title' => array(
                        'type' => 'string',
                    ),
                    'type' => array(
                        'type' => 'string',
                    ),
                    'kind' => array(
                        'type' => 'string',
                    ),
                ),
            ),
        ),
    ] );

    register_post_meta( 'landing', 'navCTALabel', [
        'type' => 'string',
        'single' => true,
        'show_in_rest' => true
    ] );

    register_post_meta( 'landing', 'navCTALink2', [
        'type' => 'object',
        'single' => true,
        'show_in_rest' => array(
            'schema' => array(
                'type' => 'object',
                'properties' => array(
                    'url' => array(
                        'type' => 'string',
                    ),
                    'opensInNewTab' => array(
                        'type' => 'boolean',
                    ),
                    'id' => array(
                        'type' => 'integer'
                    ),
                    'title' => array(
                        'type' => 'string',
                    ),
                    'type' => array(
                        'type' => 'string',
                    ),
                    'kind' => array(
                        'type' => 'string',
                    ),
                ),
            ),
        ),
    ] );

    register_post_meta( 'landing', 'navCTALabel2', [
        'type' => 'string',
        'single' => true,
        'show_in_rest' => true
    ] );

    register_post_meta( 'landing', 'footerLogo', [
        'type' => 'integer',
        'single' => true,
        'show_in_rest' => true
    ] );

    register_post_meta( 'landing', 'footerCTALink', [
        'type' => 'object',
        'single' => true,
        'show_in_rest' => array(
            'schema' => array(
                'type' => 'object',
                'properties' => array(
                    'url' => array(
                        'type' => 'string',
                    ),
                    'opensInNewTab' => array(
                        'type' => 'boolean',
                    ),
                    'id' => array(
                        'type' => 'integer'
                    ),
                    'title' => array(
                        'type' => 'string',
                    ),
                    'type' => array(
                        'type' => 'string',
                    ),
                    'kind' => array(
                        'type' => 'string',
                    ),
                ),
            ),
        ),
    ] );

    register_post_meta( 'landing', 'footerCTALabel', [
        'type' => 'string',
        'single' => true,
        'show_in_rest' => true
    ] );

    register_post_meta( 'landing', 'footerCTALink2', [
        'type' => 'object',
        'single' => true,
        'show_in_rest' => array(
            'schema' => array(
                'type' => 'object',
                'properties' => array(
                    'url' => array(
                        'type' => 'string',
                    ),
                    'opensInNewTab' => array(
                        'type' => 'boolean',
                    ),
                    'id' => array(
                        'type' => 'integer'
                    ),
                    'title' => array(
                        'type' => 'string',
                    ),
                    'type' => array(
                        'type' => 'string',
                    ),
                    'kind' => array(
                        'type' => 'string',
                    ),
                ),
            ),
        ),
    ] );

    register_post_meta( 'landing', 'footerCTALabel2', [
        'type' => 'string',
        'single' => true,
        'show_in_rest' => true
    ] );

    register_post_meta( 'landing', 'anchorLinks', array(
        'type' => 'array',
        'single' => true,
        'default' => array(),
        'show_in_rest' => array(
            'schema' => array(
                'type'  => 'array',
                'items' => array(
                    'type' => 'object',
                    'properties' => array(
                        'anchorId' => array(
                            'type' => 'string',
                        ),
                        'anchorText'  => array(
                            'type' => 'string',
                        ),
                    ),
                )
            )
        )
    ));
}
