<?php

namespace NS\blocks\stakeHeroSimple;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );

function register_assets() {
    wp_register_style( 'ns-stakeholderHeroSimple', THEME_BLOCKS_URL . 'stakeholder-hero-simple/style-index.css', [STYLES_DEP], THEME_VERSION );
}
