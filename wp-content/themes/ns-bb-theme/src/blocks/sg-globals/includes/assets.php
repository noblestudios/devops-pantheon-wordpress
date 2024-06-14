<?php

namespace NS\blocks\sg_globals;

add_action('enqueue_block_assets', __NAMESPACE__ . '\register_assets');

function register_assets()
{
    $file = is_admin() ? 'index.css' : 'style-index.css';
    wp_register_style('ns-sgGlobals', THEME_BLOCKS_URL . 'sg-globals/' . $file, [], THEME_VERSION);
}
