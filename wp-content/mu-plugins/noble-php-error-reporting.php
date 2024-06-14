<?php

/**
 * Plugin Name: Noble Studios PHP Error Reporting Override
 * Description: A simple plugin to override the default PHP error reporting settings in WordPress.
 * Author: Noble Studios
 * Author URI: https://www.noblestudios.com
 * Version: 1.0
 */

if (defined('WP_INSTALLING') && WP_INSTALLING) {
    return;
}

/*
 * When WB_DEBUG is enabled wp sets error reporting wide open.
 * Doesn't matter what you set it to in your config.
 *
 * The issue is the order of when error_reporting is called. from wp config it
 * is one of the first things called, but then the function wp_debug_mode is
 * called _after_ wp config is loaded, which sets a wide open error_reporting value
 *
 * For example: We want to hide deprecated warnings, but still show all other errors,
 * to 1) not clutter the logs with deprecated warnings, and 2) to not show
 * deprecated warnings to the end user. So we can set a custom error reporting value
 * with the NS_ERROR_REPORTING constant, _after_ wp_debug_mode is called
 */
if (defined('NS_ERROR_REPORTING')) {
    error_reporting(NS_ERROR_REPORTING);
}
