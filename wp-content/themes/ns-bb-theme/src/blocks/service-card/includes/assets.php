<?php

namespace NS\blocks\services;

add_action('enqueue_block_assets', __NAMESPACE__ . '\register_assets');

function register_assets() {
    wp_register_style('ns-services', THEME_BLOCKS_URL . 'service-card/style-index.css', [STYLES_DEP], THEME_VERSION);
}
