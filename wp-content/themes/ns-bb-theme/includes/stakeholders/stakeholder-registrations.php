<?php

namespace NobleStudios\registrations\stakeholders;

add_action( 'init', __NAMESPACE__ . '\register_stakeholder_type', 10 );

function register_stakeholder_type() {

    register_post_type( 'stakeholder', array(
        'labels' => array(
            'name' => 'Stakeholders',
            'singular_name' => 'Stakeholder',
            'add_new_item' => 'Add New Stakeholder',
            'all_items' => 'All Stakeholders',
            'edit_item' => 'Edit Stakeholder',
        ),
        'public' => true,
        'exclude_from_search' => false,
        'publicly_queryable' => true,
        'show_ui' => true,
        'show_in_menu' => true,
        'show_in_rest' => true,
        'query_var' => true,
        'rewrite' => array(
            'with_front' => true,
            'slug' => 'stakeholder'
        ),
        'template' => array(
            array( 'ns/stakeholder-hero', [], [] ),
            array( 'ns/stake-details-slider', [], [] ),
            array( 'ns/stakeholder-property-info', [], [] ),
            array( 'ns/stake-featured-topics', [], [] ),
            array( 'ns/related-posts', ['headline' => 'Related Stakeholders'], [] ),
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
        'menu_icon' => 'dashicons-building',
        'taxonomies' => ['stakeholder_cat']
    ) );

    register_taxonomy(
        'stakeholder_cat',
        ['stakeholder'],
        array(
            'labels' => array(
                'name' => __( 'Categories' ),
                'singular_name' => __( 'Category' ),
                'search_items' => __( 'Search Categories' ),
                'all_items' => __( 'All Categories' ),
                'parent_item' => __( 'Parent Category' ),
                'parent_item_colon' => __( 'Parent Category:' ),
                'edit_item' => __( 'Edit Category' ),
                'update_item' => __( 'Update Category' ),
                'add_new_item' => __( 'Add New Category' ),
                'new_item_name' => __( 'New Category' ),
                'menu_name' => __( 'Categories' ),
            ),
            'show_in_rest' => true,
            'hierarchical' => true,
            'query_var' => true,
            'public' => true,
            'rewrite' => array('slug' => 'stakeholder_cat'),
            'show_admin_column' => true
        )
    );

    register_taxonomy(
        'amenities',
        ['stakeholder'],
        array(
            'labels' => array(
                'name' => __( 'Amenities' ),
                'singular_name' => __( 'Amenity' ),
                'search_items' => __( 'Search Amenities' ),
                'all_items' => __( 'All Amenities' ),
                'parent_item' => __( 'Parent Amenity' ),
                'parent_item_colon' => __( 'Parent Amenity:' ),
                'edit_item' => __( 'Edit Amenity' ),
                'update_item' => __( 'Update Amenity' ),
                'add_new_item' => __( 'Add New Amenity' ),
                'new_item_name' => __( 'New Amenity' ),
                'menu_name' => __( 'Amenities' ),
            ),
            'show_in_rest' => true,
            'hierarchical' => true,
            'query_var' => true,
            'public' => true,
            'rewrite' => array('slug' => 'amenities'),
            'show_admin_column' => true
        )
    );
}

add_action( 'init', __NAMESPACE__ . '\register_stakeholder_meta', 10 );

function register_stakeholder_meta() {

    // post meta

    register_post_meta( 'stakeholder', 'stkAddress1', [
        'type' => 'string',
        'single' => true,
        'show_in_rest' => true
    ] );

    register_post_meta( 'stakeholder', 'stkAddress2', [
        'type' => 'string',
        'single' => true,
        'show_in_rest' => true
    ] );

    register_post_meta( 'stakeholder', 'stkAddressUnit', [
        'type' => 'string',
        'single' => true,
        'show_in_rest' => true
    ] );

    register_post_meta( 'stakeholder', 'stkMapObject', [
        'type' => 'object',
        'single' => true,
        'show_in_rest' => array(
            'schema' => array(
                'type' => 'object',
                'properties' => array(
                    'address' => array(
                        'type' => 'string',
                    ),
                    'lat'  => array(
                        'type' => 'string',
                    ),
                    'lng'  => array(
                        'type' => 'string',
                    ),
                ),
            ),
        )
    ] );

    register_post_meta( 'stakeholder', 'stkPhone', [
        'type' => 'string',
        'single' => true,
        'show_in_rest' => true
    ] );

    register_post_meta( 'stakeholder', 'stkWebsite', [
        'type' => 'string',
        'single' => true,
        'show_in_rest' => true
    ] );

    register_post_meta( 'stakeholder', 'stkEmail', [
        'type' => 'string',
        'single' => true,
        'show_in_rest' => true
    ] );

    register_post_meta( 'stakeholder', 'stkFacebook', [
        'type' => 'string',
        'single' => true,
        'show_in_rest' => true
    ] );

    register_post_meta( 'stakeholder', 'stkGoogle', [
        'type' => 'string',
        'single' => true,
        'show_in_rest' => true
    ] );

    register_post_meta( 'stakeholder', 'stkYoutube', [
        'type' => 'string',
        'single' => true,
        'show_in_rest' => true
    ] );

    register_post_meta( 'stakeholder', 'stkLinkedin', [
        'type' => 'string',
        'single' => true,
        'show_in_rest' => true
    ] );

    register_post_meta( 'stakeholder', 'stkInstagram', [
        'type' => 'string',
        'single' => true,
        'show_in_rest' => true
    ] );

    register_post_meta( 'stakeholder', 'stkPinterest', [
        'type' => 'string',
        'single' => true,
        'show_in_rest' => true
    ] );

    register_post_meta( 'stakeholder', 'stkTwitter', [
        'type' => 'string',
        'single' => true,
        'show_in_rest' => true
    ] );

    register_post_meta( 'stakeholder', 'stkVimeo', [
        'type' => 'string',
        'single' => true,
        'show_in_rest' => true
    ] );

    register_term_meta( 'stakeholder_cat', 'term_thumb_id', [
        'type' => 'integer',
        'default' => 0,
        'show_in_rest' => true,
        'single' => true,
    ] );
}
