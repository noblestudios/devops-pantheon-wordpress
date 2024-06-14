<?php

namespace NS\blocks\footer4;

add_action('enqueue_block_assets', __NAMESPACE__ . '\register_assets');

function register_assets() {
    wp_register_style('ns-footer4', THEME_BLOCKS_URL . 'footer-4/style-index.css', [STYLES_DEP], THEME_VERSION);
}
