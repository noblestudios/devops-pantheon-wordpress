<?php

namespace NS\blocks\stakeDetailsSlider;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );

function register_assets() {
    wp_register_style( 'ns-stakeDetailsSlider', THEME_BLOCKS_URL . 'stake-details-slider/style-index.css', [STYLES_DEP], THEME_VERSION );
    wp_register_style( 'ns-detailsImageSlider', THEME_STYLE_URL . 'blocks/details-image-slider.css', [STYLES_DEP], THEME_VERSION );

    wp_register_script( 'ns-stakeholderSlider-js', THEME_SCRIPT_URL . 'blocks/stake-gallery-swiper.js', [], THEME_VERSION, true );
}
