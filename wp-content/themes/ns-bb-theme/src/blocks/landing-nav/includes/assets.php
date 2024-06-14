<?php

namespace NS\blocks\landing_nav;

add_action('enqueue_block_assets', __NAMESPACE__ . '\register_assets');

function register_assets() {
    wp_register_style('ns-landing-nav', THEME_BLOCKS_URL . 'landing-nav/style-index.css', [STYLES_DEP], THEME_VERSION);
}
