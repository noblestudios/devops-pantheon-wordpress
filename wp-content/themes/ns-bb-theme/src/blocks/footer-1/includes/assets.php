<?php

namespace NS\blocks\footer1;

add_action('enqueue_block_assets', __NAMESPACE__ . '\register_assets');

function register_assets() {
    wp_register_style('ns-footer1', THEME_BLOCKS_URL . 'footer-1/style-index.css', [STYLES_DEP], THEME_VERSION);
}
