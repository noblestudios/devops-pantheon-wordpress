<?php

namespace NS\blocks\tertiaryHero;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );

function register_assets() {
    wp_register_style( 'ns-tertiaryHero', THEME_BLOCKS_URL . 'tertiary-hero/style-index.css', [STYLES_DEP], THEME_VERSION );
}
