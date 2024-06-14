<?php

namespace NobleStudios\filters\images;

add_filter( 'post_thumbnail_id', __NAMESPACE__ . '\post_thumbnail_id', 2, 99 );

function post_thumbnail_id( $thumb_id, $post ) {

    $filterable = [
        'post',
        'page',
        'tribe_events',
        'stakeholder'
    ];

    if( $thumb_id || !in_array( $post->post_type, $filterable ) ) return $thumb_id;

    $thumb_id = post_cat_thumbnail_id( $post );

    return $thumb_id;

}

function post_cat_thumbnail_id ( $post ) {
    if( is_integer( $post ) ) $post = get_post( $post );
    $thumb_id = false;

    switch( $post->post_type ) {
        case 'page' : {

            if( !$thumb_id ) {
                $thumb_id = get_option( 'ns_page_default_image' );
            }
            break;
        }

        case 'post' : {
            $terms = get_the_category( $post->ID );
            if( $terms ) {
                foreach( $terms as $term ) {
                    if( !$term->parent ) {
                        $thumb_id = get_term_meta($term->term_id, 'term_thumb_id', true);
                    }
                }
            }
            if( !$thumb_id ) {
                $thumb_id = get_option( 'ns_post_default_image' );
            }
            break;
        }

        case 'stakeholder' : {
            $thumb_id = get_option( 'ns_stake_default_image' );
            break;
        }

        case 'tribe_events' : {
            $terms = get_the_terms( $post->ID, 'tribe_events_cat' );
            if( $terms ) {
                foreach( $terms as $term ) {
                    if( !$term->parent ) {
                        $thumb_id = get_term_meta($term->term_id, 'term_thumb_id', true);
                    }
                }
            }
            if( !$thumb_id ) {
                $thumb_id = get_option( 'ns_event_default_image' );
            }
            break;
        }
    }

    return $thumb_id;
}
