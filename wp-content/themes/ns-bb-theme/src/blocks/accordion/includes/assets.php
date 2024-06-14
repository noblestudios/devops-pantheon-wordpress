<?php

namespace NS\blocks\accordion;

add_action('enqueue_block_assets', __NAMESPACE__ . '\register_assets');

function register_assets() {
    wp_register_style('ns-accordion', THEME_BLOCKS_URL . 'accordion/style-index.css', [STYLES_DEP], THEME_VERSION);
}
