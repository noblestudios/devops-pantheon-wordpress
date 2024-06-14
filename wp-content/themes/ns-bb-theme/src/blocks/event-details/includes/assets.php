<?php

namespace NS\blocks\eventDetails;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );

function register_assets() {
    wp_register_style( 'ns-eventDetails', THEME_BLOCKS_URL . 'event-details/style-index.css', [STYLES_DEP], THEME_VERSION );
    wp_register_style( 'ns-detailsImageSlider', THEME_STYLE_URL . 'blocks/details-image-slider.css', [STYLES_DEP], THEME_VERSION );

    wp_register_script( 'ns-stakeholderSlider-js', THEME_SCRIPT_URL . 'blocks/stake-gallery-swiper.js', [], THEME_VERSION, true );
}
