<?php

namespace NobleStudios\restapi\advSearch;

// custom endpoint for theme options
add_action( 'rest_api_init', __NAMESPACE__ . '\adv_search_endpoint' );

function adv_search_endpoint() {
    register_rest_route( 'ns/v1', '/adv-search', array(
        'methods' => 'GET',
        'callback' => __NAMESPACE__ . '\search_results',
        'permission_callback' =>  '__return_true'
  ) );
}

function search_results() {

    $args = [
        'posts_per_page' =>  get_option('posts_per_page'),
        'orderby' => 'relevance',
        'paged' => $_GET['page'],
        's' => $_GET['s']
    ];

    if( !empty( $_GET['type'] ) ) {
        $args['post_type'] = $_GET['type'];
    }
    else {
        $args['post_type'] = 'any';
    }

    $query = new \WP_Query( $args );
    header( 'X-WP-TotalPages: ' . $query->max_num_pages );
    header( 'X-WP-Total: ' . $query->found_posts );

    $results = [];
    foreach( $query->posts as $post ) {

        $post_type_obj = get_post_type_object( get_post_type( $post->ID ) );

        $result = [
            'id' => $post->ID,
            'type' => $post->post_type,
            'date' => $post->post_date,
            'title' => $post->post_title,
            'excerpt' => $post->post_excerpt,
            'link' => get_the_permalink($post->ID),
            'author_name' => get_the_author_meta( 'display_name', $post->post_author ),
            'featured_image_url_sizes' => [
                'thumbnail' => get_the_post_thumbnail_url($post->ID, 'thumbnail'),
                'medium' => get_the_post_thumbnail_url($post->ID, 'medium'),
                'medium_large' => get_the_post_thumbnail_url($post->ID, 'medium_large'),
                'large' => get_the_post_thumbnail_url($post->ID, 'large'),
                'full' => get_the_post_thumbnail_url($post->ID, 'full'),
            ],
            'post_type_label' => __($post_type_obj->labels->singular_name, 'ns'),
        ];
        $results[] = $result;
    }
    return $results;
}
