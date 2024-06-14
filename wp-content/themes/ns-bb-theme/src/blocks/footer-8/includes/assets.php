<?php

namespace NS\blocks\footer8;

add_action('enqueue_block_assets', __NAMESPACE__ . '\register_assets');

function register_assets() {
    wp_register_style('ns-footer8', THEME_BLOCKS_URL . 'footer-8/style-index.css', [STYLES_DEP], THEME_VERSION);
}
