<?php

namespace NS\blocks\footer7;

add_action('enqueue_block_assets', __NAMESPACE__ . '\register_assets');

function register_assets() {
    wp_register_style('ns-footer7', THEME_BLOCKS_URL . 'footer-7/style-index.css', [STYLES_DEP], THEME_VERSION);
}
