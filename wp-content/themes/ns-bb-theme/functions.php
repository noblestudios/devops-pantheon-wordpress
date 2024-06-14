<?php

/**
 *
 */
if (!function_exists('get_current_env')) {
    function get_current_env(): ?string
    {
        // FYI Lando sets PANTHEON_ENVIRONMENT=lando
        // https://docs.lando.dev/pantheon/environment.html
        return getenv('PANTHEON_ENVIRONMENT') ?: 'local';
    }
}

if (!function_exists('is_env')) {
    function is_env(...$name): bool
    {
        $currentEnv = get_current_env();
        return in_array($currentEnv, $name);
    }
}

// getting a version from the main.asset.php file ensures we get a version update on every build and deployment, no more theme version bumping
$asset_file    = dirname( __FILE__ ) . '/build/styles/main.asset.php';
$asset_version = file_exists( $asset_file ) ? include( $asset_file ) : false;
define( 'THEME_VERSION', $asset_version ? $asset_version['version'] : wp_get_theme()->get( 'Version' ) );

define( 'THEME_PATH', dirname( __FILE__ ) );
define( 'THEME_STYLE_URL', get_template_directory_uri() . '/build/styles/' );
define( 'THEME_SCRIPT_URL', get_template_directory_uri() . '/build/scripts/' );
define( 'THEME_BLOCKS_URL', get_template_directory_uri() . '/build/blocks/' );
define( 'THEME_ASSETS_URL', get_template_directory_uri() . '/assets/' );
define( 'STYLES_DEP', 'noble-core-block-styles' );

function include_files_in_folder( $directory = "" ) {
    if ( $directory === "" ) {
        return;
    }

    foreach ( glob( $directory . '/*' ) as $path ) {
        if ( is_dir( $path ) ) {
            include_files_in_folder( $path );
        } elseif ( pathinfo( $path, PATHINFO_EXTENSION ) === 'php' ) {
            require_once $path;
        }
    }
}

include_files_in_folder( THEME_PATH . '/includes' );
