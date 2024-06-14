<?php

namespace NS\blocks\site_map;

add_action('enqueue_block_assets', __NAMESPACE__ . '\register_assets');

function register_assets() {
    wp_register_style('ns-site-map', THEME_BLOCKS_URL . 'site-map/style-index.css', [STYLES_DEP], THEME_VERSION);
}
