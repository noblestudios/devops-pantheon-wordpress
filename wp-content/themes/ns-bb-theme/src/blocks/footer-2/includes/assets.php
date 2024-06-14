<?php

namespace NS\blocks\footer2;

add_action('enqueue_block_assets', __NAMESPACE__ . '\register_assets');

function register_assets() {
    wp_register_style('ns-footer2', THEME_BLOCKS_URL . 'footer-2/style-index.css', [STYLES_DEP], THEME_VERSION);
}
