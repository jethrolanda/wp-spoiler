<?php
/**
 * Plugins custom settings page that adheres to wp standard
 * see: https://developer.wordpress.org/plugins/settings/custom-settings-page/
 *
 * @since   1.0
 */

defined('ABSPATH') || exit;

/**
 * WP Settings Class.
 */
class WPs_Settings
{

    /**
     * The single instance of the class.
     *
     * @var WooCommerce
     * @since 1.0
     */
    protected static $_instance = null;

    /**
     * Main Instance.
     * 
     * @since 1.0
     */
    public static function instance()
    {
        if (is_null(self::$_instance)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    /**
     * Constructor.
     * 
     * @since 1.0
     */
    public function __construct()
    {

        // Add custom menu to wp admin menu
        add_action('admin_menu', array($this, 'custom_menu'), 10);
        
    }
    
    /**
     * Add custom wp admin menu.
     * 
     * @since 1.0
     */
    public function custom_menu()
    {
        add_menu_page(
            'Spoiler',
            'Spoiler',
            'edit_posts',
            'spoiler_settings',
            array($this, 'spoiler_settings_page'),
            'dashicons-media-spreadsheet'
        );
    }
    
    /**
     * Display content to the new added custom wp admin menu.
     * 
     * @since 1.0
     */
    public function spoiler_settings_page()
    {
      ?>
      <div id="spoiler-settings">
        <h2>Loading...</h2>
      </div> <?php

    }
}

new WPs_Settings();
