<?php
add_action("rest_api_init", function () {
    $post_types = get_post_types();
    foreach ($post_types as $post_type) {
        // loop all post types and add field "featured_image_url" to api output.
        register_rest_field($post_type, "featured_image_url", array("get_callback" => function ($post) {
            if( isset($post['id']) ) {
                return get_the_post_thumbnail_url($post['id']) ? : "";
            }
            else return null;
        }));
    }
});


// add category names comma separated list to posts
add_action("rest_api_init", function () {
    register_rest_field( 'post', 'category_names', array( "get_callback" => function ($post) {
        return strip_tags(get_the_term_list( $post['id'], 'category', '', ', ', '' ));
    }));
});

add_action("rest_api_init", function () {
    $post_types = get_post_types();
    foreach ($post_types as $post_type) {
        // loop all post types and add field "featured_image_url_sizes" to api output.
        register_rest_field($post_type, "featured_image_url_sizes", array("get_callback" => function ($post) {
            if( isset($post['id']) ) {
                return [
                    'thumbnail' => get_the_post_thumbnail_url($post['id'], 'thumbnail'),
                    'medium' => get_the_post_thumbnail_url($post['id'], 'medium'),
                    'medium_large' => get_the_post_thumbnail_url($post['id'], 'medium_large'),
                    'large' => get_the_post_thumbnail_url($post['id'], 'large'),
                    'full' => get_the_post_thumbnail_url($post['id'], 'full'),
                ];
            }
            else return null;
        }));
    }
});

//adding term images
add_action("rest_api_init", function () {
    $taxonomies = ['category'];
    foreach ($taxonomies as $taxonomy) {
        register_rest_field($taxonomy, "featured_image_url_sizes", array("get_callback" => function ($term) {
            $thumb_id = get_term_meta($term['id'], 'term_thumb_id', true);
            return [
                'thumbnail' => $thumb_id ? wp_get_attachment_image_url( $thumb_id, 'thumbnail' ) : '',
                'medium' => $thumb_id ? wp_get_attachment_image_url( $thumb_id, 'medium' ) : '',
                'medium_large' => $thumb_id ? wp_get_attachment_image_url( $thumb_id, 'medium_large' ) : '',
                'large' => $thumb_id ? wp_get_attachment_image_url( $thumb_id, 'large' ) : '',
                'full' => $thumb_id ? wp_get_attachment_image_url( $thumb_id, 'full' ) : '',
            ];
        }));
    }
});
