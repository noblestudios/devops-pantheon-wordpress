<?php

namespace NS\blocks\defaultHero;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );

function register_assets() {
    wp_register_style( 'ns-defaultHero', THEME_BLOCKS_URL . 'default-hero/style-index.css', [STYLES_DEP], THEME_VERSION );
}
