<?php

namespace NS\blocks\articleDetail1;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );

function register_assets() {
    wp_register_style( 'ns-articleDetail-1', THEME_BLOCKS_URL . 'article-detail-1/style-index.css', [STYLES_DEP], THEME_VERSION );
    wp_register_style( 'ns-articleDetail-sidebar', THEME_STYLE_URL . 'blocks/article-detail-sidebar.css', [STYLES_DEP], THEME_VERSION );
}
