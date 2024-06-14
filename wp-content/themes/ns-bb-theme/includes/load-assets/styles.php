<?php

namespace NobleStudios\loadAssets\styles;

add_filter('tribe_asset_enqueue', __NAMESPACE__ . '\dequeue_tribe_assets');


add_action('after_setup_theme', function () {
    add_editor_style('build/styles/tmce.css');
});

function dequeue_tribe_assets($enqueue)
{
    if (!is_admin()) return false;
    else return $enqueue;
}

add_action('enqueue_block_assets', __NAMESPACE__ . '\enqueue_styles', 1);

function enqueue_styles()
{
    // Register theme stylesheets.

    wp_register_style('noble-base-layout', THEME_STYLE_URL . 'front-end-layout.css', [], THEME_VERSION);
    wp_register_style('noble-editor-styles', THEME_STYLE_URL . 'block-editor.css', [], THEME_VERSION);

    $front_end_dep = is_admin() ? ['noble-editor-styles'] : ['noble-base-layout'];

    wp_register_style('noble-properties', THEME_STYLE_URL . 'css-properties.css', $front_end_dep, THEME_VERSION);
    wp_register_style('noble-base-style', THEME_STYLE_URL . 'main.css', ['noble-properties'], THEME_VERSION);
    wp_register_style('noble-core-block-styles', THEME_STYLE_URL . 'core-blocks.css', ['noble-base-style'], THEME_VERSION);
}

// let's revisit how we handle gravity form styles
function ns_gravity_form($form, $is_ajax)
{
    wp_register_style(
        'ns-gforms',
        THEME_STYLE_URL . 'gforms.css',
        array(),
        THEME_VERSION
    );

    // Enqueue theme stylesheet.
    wp_enqueue_style('ns-gforms');
}
add_action('gform_enqueue_scripts', __NAMESPACE__ . '\ns_gravity_form', 10, 2);
