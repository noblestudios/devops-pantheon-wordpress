<?php

namespace NS\blocks\stakePropertyInfo;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );

function register_assets() {
    wp_register_style( 'ns-stakePropertyInfo', THEME_BLOCKS_URL . 'stake-property-info/style-index.css', [STYLES_DEP], THEME_VERSION );
}
