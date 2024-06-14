<?php

namespace NS\blocks\vertical_anchor;

add_action('enqueue_block_assets', __NAMESPACE__ . '\register_assets');

function register_assets() {
    wp_register_style('ns-vertical-anchor', THEME_BLOCKS_URL . 'vertical-anchor/style-index.css', [STYLES_DEP], THEME_VERSION);
}
