<?php

namespace NS\blocks\sg_container;

add_action('enqueue_block_assets', __NAMESPACE__ . '\register_assets');

function register_assets() {
    wp_register_style('ns-sg-container', THEME_BLOCKS_URL . 'sg-container/style-index.css', [STYLES_DEP], THEME_VERSION);
}
