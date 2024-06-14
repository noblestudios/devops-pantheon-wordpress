<?php

namespace NS\blocks\breadcrumbs;

add_action('enqueue_block_assets', __NAMESPACE__ . '\register_assets');

function register_assets()
{
    wp_register_style('ns-breadcrumbs', THEME_BLOCKS_URL . 'breadcrumbs/style-index.css', [STYLES_DEP], THEME_VERSION);
}
