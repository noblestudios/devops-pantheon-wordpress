<?php

namespace NS\blocks\starterBlock;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );

function register_assets() {
    wp_register_style( 'ns-starterBlock', THEME_BLOCKS_URL . 'starter-block/style-index.css', [STYLES_DEP], THEME_VERSION );
}
