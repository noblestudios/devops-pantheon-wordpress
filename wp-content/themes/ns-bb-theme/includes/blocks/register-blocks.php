<?php

// register native blocks in build
function register_custom_block_types()
{

    foreach (glob(THEME_PATH . DIRECTORY_SEPARATOR . 'build/blocks' . DIRECTORY_SEPARATOR . '*') as $path) {
        if (is_dir($path) && file_exists($path . DIRECTORY_SEPARATOR . 'block.json')) {
            register_block_type_from_metadata($path . DIRECTORY_SEPARATOR . 'block.json');
        }
    }
    foreach (glob(THEME_PATH . '/src/blocks/*') as $path) {
        if (is_dir($path . '/includes')) {
            foreach (glob($path . '/includes/*') as $file) {
                require_once($file);
            }
        }
    }
}

add_action('init', 'register_custom_block_types');

add_filter('block_categories_all', function ($categories) {

    array_unshift($categories, array(
        'slug'  => 'custom-blocks',
        'title' => 'Custom Blocks'
    ));

    array_unshift($categories, array(
        'slug'  => 'nav-blocks',
        'title' => 'Navigation'
    ));

    array_unshift($categories, array(
        'slug'  => 'hero-blocks',
        'title' => 'Heros'
    ));

    array_unshift($categories, array(
        'slug'  => 'listing-blocks',
        'title' => 'Listings'
    ));

    return $categories;
});

// Disable the block directory, which allows 3rd party blocks to be downloaded from the block list sidebar
remove_action( 'enqueue_block_editor_assets', 'wp_enqueue_editor_block_directory_assets' );

// our block blacklist

add_filter( 'allowed_block_types_all', 'ns_allowed_block_types', 99, 2 );

function ns_allowed_block_types( $blocks, $editor_context ) {
    // unregister_block_type function does not work for core blocks, we have to use this filter
    $blocks = \WP_Block_Type_Registry::get_instance()->get_all_registered();

    $blacklist = [
        'core/code',
        'core/preformatted',
        'core/table',
        'core/verse',
        //'core/quote',
        'core/pullquote',
        'core/cover',
        'core/audio',
        'core/file',
        'core/more',
        'core/nextpage',
        'core/archives',
        'core/calendar',
        'core/categories',
        'core/latest-comments',
        'core/latest-posts',
        'core/page-list',
        'core/rss',
        'core/search',
        'core/social-links',
        'core/tag-cloud',

        //theme blocks
        'core/navigation',
        'core/site-logo',
        'core/site-title',
        'core/site-tagline',
        'core/query',
        'core/avatar',
        'core/post-title',
        'core/post-excerpt',
        //'core/post-featured-image',
        'core/post-author',
        'core/post-date',
        'core/post-terms',
        'core/post-navigation-link',
        'core/read-more',
        //'core/comments-query-loop',
        'core/post-comments-form',
        'core/loginout',
        'core/term-description',
        'core/post-author-biography',
        'core/query-title',
    ];

    // only allow header and footer to be inserted in site editor
    // commented out because we want to build test pages for these while in development
    if( $editor_context->name !== 'core/edit-site' ) {
        // $blacklist[] = 'ns/nav-bottom-logo';
        // $blacklist[] = 'ns/nav-full-logo';
        // $blacklist[] = 'ns/nav-simple';
        // $blacklist[] = 'ns/nav-top-logo';
        // $blacklist[] = 'ns/footer1';
        // $blacklist[] = 'ns/footer2';
        // $blacklist[] = 'ns/footer3';
        // $blacklist[] = 'ns/footer4';
        // $blacklist[] = 'ns/footer5';
        // $blacklist[] = 'ns/footer6';
        // $blacklist[] = 'ns/footer7';
        // $blacklist[] = 'ns/footer8';
    }

    // editing a page
    if( $editor_context->name !== 'core/edit-site' && isset( $editor_context->post->post_type ) ) {

        if ( $editor_context->post->post_type !== 'stakeholder') {
            //$blacklist[] = 'ns/stake-details-simple';
            //$blacklist[] = 'ns/stake-details-slider';
            //$blacklist[] = 'ns/stake-featured-topics';
            //$blacklist[] = 'ns/stake-property-info';
            //$blacklist[] = 'ns/stakeholder-hero';
            //$blacklist[] = 'ns/stakeholder-hero-simple';
        }

        if ( $editor_context->post->post_type !== 'tribe_events') {
            //$blacklist[] = 'ns/event-details';
            //$blacklist[] = 'ns/event-hero';
        }
    }

    // now unset plugin blocks
    foreach( array_keys( $blocks ) as $name ) {
        if( str_starts_with( $name, 'tribe/' ) ) {
            $blacklist[] = $name;
        }
        else if( str_starts_with( $name, 'tec/' ) ) {
            $blacklist[] = $name;
        }
        else if( str_starts_with( $name, 'safe-svg/' ) ) {
            $blacklist[] = $name;
        }
        else if( str_starts_with( $name, 'yoast-seo/' ) ) {
            $blacklist[] = $name;
        }
        else if( str_starts_with( $name, 'yoast/' ) ) {
            $blacklist[] = $name;
        }
    }

    foreach( $blacklist as $name ) {
        unset( $blocks[$name] );
    }

    return array_keys( $blocks );
}
