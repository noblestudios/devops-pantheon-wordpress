<?php

/**
 *
 */
if ( ! function_exists( 'get_current_env' ) ) {
    function get_current_env(): ?string {
        // FYI Lando sets PANTHEON_ENVIRONMENT=lando.
        // https://docs.lando.dev/pantheon/environment.html.
        return getenv( 'PANTHEON_ENVIRONMENT' ) ?: 'local'; //phpcs:ignore
    }
}

if ( ! function_exists( 'is_env' ) ) {
    function is_env( ...$name ): bool {
        return in_array( get_current_env(), $name, true );
    }
}

/**
 * This config file is yours to hack on. It will work out of the box on Pantheon
 * but you may find there are a lot of neat tricks to be used here.
 *
 * See our documentation for more details:
 *
 * https://pantheon.io/docs
 */

/**
 * Pantheon platform settings. Everything you need should already be set.
 */
if (file_exists(dirname(__FILE__) . '/wp-config-pantheon.php') && isset($_ENV['PANTHEON_ENVIRONMENT'])) {
	require_once(dirname(__FILE__) . '/wp-config-pantheon.php');

/**
 * Local configuration information.
 *
 * If you are working in a local/desktop development environment and want to
 * keep your config separate, we recommend using a 'wp-config-local.php' file,
 * which you should also make sure you .gitignore.
 */
} elseif (file_exists(dirname(__FILE__) . '/wp-config-local.php') && !isset($_ENV['PANTHEON_ENVIRONMENT'])){
	# IMPORTANT: ensure your local config does not include wp-settings.php
	require_once(dirname(__FILE__) . '/wp-config-local.php');

/**
 * This block will be executed if you are NOT running on Pantheon and have NO
 * wp-config-local.php. Insert alternate config here if necessary.
 *
 * If you are only running on Pantheon, you can ignore this block.
 */
} else {
	define('DB_NAME',          'database_name');
	define('DB_USER',          'database_username');
	define('DB_PASSWORD',      'database_password');
	define('DB_HOST',          'database_host');
	define('DB_CHARSET',       'utf8');
	define('DB_COLLATE',       '');
	define('AUTH_KEY',         'put your unique phrase here');
	define('SECURE_AUTH_KEY',  'put your unique phrase here');
	define('LOGGED_IN_KEY',    'put your unique phrase here');
	define('NONCE_KEY',        'put your unique phrase here');
	define('AUTH_SALT',        'put your unique phrase here');
	define('SECURE_AUTH_SALT', 'put your unique phrase here');
	define('LOGGED_IN_SALT',   'put your unique phrase here');
	define('NONCE_SALT',       'put your unique phrase here');
}


/** Standard wp-config.php stuff from here on down. **/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * You may want to examine $_ENV['PANTHEON_ENVIRONMENT'] to set this to be
 * "true" in dev, but false in test and live.
 */
define( 'WP_DEBUG', ! is_env( 'live' ) );
define( 'WP_DEBUG_LOG', ! is_env( 'live' ) );
define( 'WP_DEBUG_DISPLAY', ! is_env( 'live' ) );

if ( is_env( 'local', 'lando' ) ) {
    // Send email to Mailhog.
    define( 'WPMS_ON', true );
    define( 'WPMS_MAIL_FROM', 'mail@example.org' );
    define( 'WPMS_MAIL_FROM_FORCE', true );
    define( 'WPMS_MAIL_FROM_NAME', 'Noble Developer' );
    define( 'WPMS_MAIL_FROM_NAME_FORCE', true );

    define( 'WPMS_MAILER', 'smtp' );
    define( 'WPMS_SSL', '' );
    define( 'WPMS_SMTP_AUTOTLS', true );
    define( 'WPMS_SMTP_HOST', 'mailhog' );
    define( 'WPMS_SMTP_PORT', 1025 );
    define( 'WPMS_SMTP_AUTH', false );
}

/* That's all, stop editing! Happy Pressing. */

/*
 * Set a custom error reporting level. This is useful for development and testing.
 * This is provided by the mu-plugin noble-php-error-reporting.php
 */
if ( defined( 'WP_DEBUG' ) && WP_DEBUG ) {
    define( 'NS_ERROR_REPORTING', E_ALL & ~E_DEPRECATED & ~E_USER_DEPRECATED );
}



/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
