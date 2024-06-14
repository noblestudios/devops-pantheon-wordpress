<?php

namespace NS\blocks\horizontal_anchor;

add_action('enqueue_block_assets', __NAMESPACE__ . '\register_assets');

function register_assets() {
    wp_register_style('ns-horizontal-anchor', THEME_BLOCKS_URL . 'horizontal-anchor/style-index.css', [STYLES_DEP], THEME_VERSION);
}
