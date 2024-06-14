<?php

namespace NS\blocks\cta_grid;

add_action('enqueue_block_assets', __NAMESPACE__ . '\register_assets');

function register_assets() {
    wp_register_style('ns-cta-grid', THEME_BLOCKS_URL . 'cta-grid/style-index.css', [STYLES_DEP], THEME_VERSION);
}
