<?php

namespace NS\blocks\stakeDetailsSimple;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );

function register_assets() {
    wp_register_style( 'ns-stakeDetailsSimple', THEME_BLOCKS_URL . 'stake-details-simple/style-index.css', [STYLES_DEP], THEME_VERSION );
}
