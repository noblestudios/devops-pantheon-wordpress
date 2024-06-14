<?php

namespace NobleStudios\registrations\offer;

add_action('init', __NAMESPACE__ . '\register_offer_type', 10);

function register_offer_type()
{

    register_post_type('offer', array(
        'labels' => array(
            'name' => 'Offer',
            'singular_name' => 'Offer',
            'add_new_item' => 'Add New offer',
            'all_items' => 'All Offers',
            'edit_item' => 'Edit offer',
        ),
        'public' => true,
        'exclude_from_search' => true,
        'publicly_queryable' => true,
        'show_ui' => true,
        'show_in_menu' => true,
        'show_in_rest' => true,
        'query_var' => true,
        'rewrite' => array(
            'with_front' => true,
            'slug' => 'offer'
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
    ));

    register_taxonomy(
        'offer_type',
        ['offer'],
        array(
            'labels' => array(
                'name' => __('Offer Type'),
                'singular_name' => __('Offer Type'),
                'search_items' => __('Search Tffer Type'),
                'all_items' => __('All Offer Type'),
                'parent_item' => __('Parent Offer Type'),
                'parent_item_colon' => __('Parent Offer Type:'),
                'edit_item' => __('Edit Offer Type'),
                'update_item' => __('Update Offer Type'),
                'add_new_item' => __('Add New Offer Type'),
                'new_item_name' => __('New Offer Type'),
                'menu_name' => __('Offer Type'),
            ),
            'show_in_rest' => true,
            'hierarchical' => true,
            'query_var' => true,
            'public' => true,
            'rewrite' => array('slug' => 'offer_type'),
            'show_admin_column' => true
        )
    );
}

add_action('init', __NAMESPACE__ . '\register_offer_meta', 10);

function register_offer_meta()
{
    register_post_meta('offer', 'offerExpiration', [
        'type' => 'string',
        'single' => true,
        'show_in_rest' => true
    ]);
    register_post_meta('offer', 'offerCost', [
        'type' => 'string',
        'single' => true,
        'show_in_rest' => true
    ]);
}
