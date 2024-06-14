<?php

namespace NS\blocks\relatedPosts;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );

function register_assets() {
    wp_register_style( 'ns-relatedPosts', THEME_BLOCKS_URL . 'related-posts/style-index.css', [STYLES_DEP], THEME_VERSION );
    wp_register_style( 'ns-paginatedResult', THEME_STYLE_URL . 'blocks/paginated-result.css', [STYLES_DEP], THEME_VERSION );
}
