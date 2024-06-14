<?php

namespace NS\blocks\searchListings;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );

function register_assets() {
    wp_register_style( 'ns-searchListings', THEME_BLOCKS_URL . 'search-listings/style-index.css', [STYLES_DEP], THEME_VERSION );
    wp_register_style( 'ns-paginatedResult', THEME_STYLE_URL . 'blocks/paginated-result.css', [STYLES_DEP], THEME_VERSION );
    wp_register_style( 'ns-pageNavigation', THEME_STYLE_URL . 'blocks/page-nav.css', [STYLES_DEP], THEME_VERSION );
}
