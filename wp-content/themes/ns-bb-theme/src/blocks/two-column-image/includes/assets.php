<?php

namespace NS\blocks\two_column_image;

add_action('enqueue_block_assets', __NAMESPACE__ . '\register_assets');

function register_assets() {
    wp_register_style('ns-two-column-image', THEME_BLOCKS_URL . 'two-column-image/style-index.css', [STYLES_DEP], THEME_VERSION);
}
