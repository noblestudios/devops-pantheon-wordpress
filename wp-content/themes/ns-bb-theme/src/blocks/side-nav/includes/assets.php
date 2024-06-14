<?php

namespace NS\blocks\sidenav;

add_action('enqueue_block_assets', __NAMESPACE__ . '\register_assets');

function register_assets() {
    wp_register_style('ns-sidenav', THEME_BLOCKS_URL . 'side-nav/style-index.css', [STYLES_DEP], THEME_VERSION);
}
