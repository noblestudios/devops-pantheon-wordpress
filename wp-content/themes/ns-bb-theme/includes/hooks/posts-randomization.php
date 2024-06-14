<?php

namespace NobleStudios\hooks\randomization;

function get_session_rand() {
    // Seed value regenerates every 1800sec (30min)
    $session_seed = get_transient('session-seed');

    if(empty($session_seed)) {
        $session_seed = set_transient('session-seed', time(), 1800);
    }

    return $session_seed;
}

function random_seeded_orderby($orderby_statement) {
    $orderby_statement = 'RAND(' . get_session_rand() . ')';

    return $orderby_statement;
}

function add_posts_orderby($query) {

    if(!is_admin() && (( isset($query->query['post_type']) && ( $query->query['post_type'] === 'stakeholder' ) && ( isset( $query->query['orderby'] ) && $query->query['orderby'] === 'random' )) ) ) {
        add_filter('posts_orderby', __NAMESPACE__ . '\random_seeded_orderby');
    } else {
        remove_filter('posts_orderby', __NAMESPACE__ . '\random_seeded_orderby');
    }
}

add_action('pre_get_posts', __NAMESPACE__ . '\add_posts_orderby');

?>
