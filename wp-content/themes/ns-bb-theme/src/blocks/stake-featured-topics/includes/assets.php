<?php

namespace NS\blocks\stakeFeaturedTopics;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );

function register_assets() {
    wp_register_style( 'ns-stakeFeaturedTopics', THEME_BLOCKS_URL . 'stake-featured-topics/style-index.css', [STYLES_DEP], THEME_VERSION );
}
