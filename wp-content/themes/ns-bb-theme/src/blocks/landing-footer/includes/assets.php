<?php

namespace NS\blocks\landingFooter;

add_action('enqueue_block_assets', __NAMESPACE__ . '\register_assets');

function register_assets() {
    wp_register_style('ns-landingFooter', THEME_BLOCKS_URL . 'landing-footer/style-index.css', [STYLES_DEP], THEME_VERSION);
}
