<?php

namespace NS\blocks\categoryGrid;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );

function register_assets() {
    wp_register_style( 'ns-categoryGrid', THEME_BLOCKS_URL . 'category-grid/style-index.css', [STYLES_DEP], THEME_VERSION );
}
