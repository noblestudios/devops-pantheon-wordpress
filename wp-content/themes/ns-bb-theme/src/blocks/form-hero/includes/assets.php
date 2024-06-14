<?php

namespace NS\blocks\formHero;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );

function register_assets() {
    wp_register_style( 'ns-formHero', THEME_BLOCKS_URL . 'form-hero/style-index.css', [STYLES_DEP], THEME_VERSION );
}
