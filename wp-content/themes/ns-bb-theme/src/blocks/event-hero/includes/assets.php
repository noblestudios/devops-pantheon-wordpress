<?php

namespace NS\blocks\eventHero;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );

function register_assets() {
    wp_register_style( 'ns-eventHero', THEME_BLOCKS_URL . 'event-hero/style-index.css', [STYLES_DEP], THEME_VERSION );
}
