<?php
/**
 * Plugin Name: WP Spoiler
 * Description: This plugin will blur spoilers from the wordpress contents.
 * Version: 1.0
 * Author: Jethro Landa
 * Author URI: https://jethrolanda.com/
 * Text Domain: wp-spoiler
 * Domain Path: /languages/
 * Requires at least: 5.8
 * Requires PHP: 7.2
 */

defined('ABSPATH') || exit;

if (!defined('WPS_PLUGIN_FILE')) {
    define('WPS_PLUGIN_FILE', __FILE__);
}

// Include the main Keyword Censor class.
if (!class_exists('WPS_Bootstrap', false)) {
    include_once dirname(WPS_PLUGIN_FILE) . '/includes/class-wps-bootstrap.php';
}

function wp_spoiler()
{
    return WPS_Bootstrap::instance();
}

// Global for backwards compatibility.
$GLOBALS['wp_spoiler'] = wp_spoiler();
