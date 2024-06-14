<?php

namespace NS\blocks\advSearch;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );

function register_assets() {
    wp_register_style( 'ns-advSearch', THEME_BLOCKS_URL . 'advanced-search/style-index.css', [STYLES_DEP], THEME_VERSION );
    wp_register_style( 'ns-paginatedResultWide', THEME_STYLE_URL . 'blocks/paginated-result-wide.css', [STYLES_DEP], THEME_VERSION );
    wp_register_style( 'ns-pageNavigation', THEME_STYLE_URL . 'blocks/page-nav.css', [STYLES_DEP], THEME_VERSION );
    // wp_register_script('ns-searchController', THEME_SCRIPT_URL . 'blocks/search-controller.js', ['wp-api', 'wp-i18n'], THEME_VERSION, true);
}
