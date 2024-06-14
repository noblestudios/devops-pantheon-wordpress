<?php

namespace NobleStudios\supports\themeSupports;

function theme_supports() {
    // Let WordPress automatically generate the <head>'s <title> tag for SEO if Yoast is not installed
    if (function_exists('is_plugin_active')) {
        if ( !( \is_plugin_active( 'wordpress-seo/wp-seo.php' ) || \is_plugin_active( 'wordpress-seo-premium/wp-seo-premium.php' ) ) ) {
            add_theme_support('title-tag');
        }
    }

    // Enable featured images (post thumbnails)
    add_theme_support('post-thumbnails');

    // For wide gutenberg blocks
    add_theme_support( 'align-wide' );

    // Update WP Core markup tags to modern HTML5 code for these items
    add_theme_support(
        'html5',
        array(
            'search-form',
            'gallery',
            'caption'
        )
    );

    // disabling for now, I do not believe these are beneficial to us. This support adds more enahnced styles to core blocks, see https://developer.wordpress.org/block-editor/how-to-guides/themes/theme-support/#default-block-styles
    // add_theme_support('wp-block-styles');

    add_theme_support('editor-styles');

    // Add support for responsive embeds (from gutenberg)
    add_theme_support( 'responsive-embeds' );
}

add_action( 'after_setup_theme', __NAMESPACE__ . '\theme_supports' );

?>
