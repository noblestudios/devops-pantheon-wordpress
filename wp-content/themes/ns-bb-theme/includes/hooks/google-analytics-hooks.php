<?php

namespace NobleStudios\hooks\ga4;

function head_script() {
    $ga4_script = get_option( 'ns_gtag' );
    if($ga4_script['head']) echo $ga4_script['head'];
}

add_action( 'wp_head', __NAMESPACE__ . '\head_script', 1 );

function after_body_open_tag() {
    $ga4_script = get_option( 'ns_gtag' );
    if($ga4_script['body']) echo $ga4_script['body'];
}

add_action( 'wp_body_open', __NAMESPACE__ . '\after_body_open_tag', 1 );
