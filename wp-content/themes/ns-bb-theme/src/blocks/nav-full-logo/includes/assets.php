<?php

namespace NS\blocks\navFullLogo;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );

function register_assets() {
    wp_register_style( 'ns-navHeader-full-logo', THEME_BLOCKS_URL . 'nav-full-logo/style-index.css', [STYLES_DEP], THEME_VERSION );

    if( !is_admin() ) {
        wp_register_style( 'ns-alertBanner', THEME_STYLE_URL . 'blocks/alert-banner.css', [STYLES_DEP], THEME_VERSION );
        wp_register_style( 'ns-searchModal', THEME_STYLE_URL . 'blocks/search-modal.css', [STYLES_DEP], THEME_VERSION );
        wp_register_script( 'ns-navHeader-js', THEME_SCRIPT_URL . 'blocks/header.js', [], THEME_VERSION, true );
    }
}
