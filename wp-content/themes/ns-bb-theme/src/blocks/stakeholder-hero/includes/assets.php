<?php

namespace NS\blocks\stakeHero;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );

function register_assets() {
    wp_register_style( 'ns-stakeholderHero', THEME_BLOCKS_URL . 'stakeholder-hero/style-index.css', [STYLES_DEP], THEME_VERSION );
}
