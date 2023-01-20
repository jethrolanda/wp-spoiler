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
class WPS_Shortcode
{

    /**
     * The single instance of the class.
     *
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

        // Add custom shortcode
        add_shortcode( 'wps_spoiler', array($this, 'add_new_shortcode'), 10, 3 );
        
    }
    
    /**
     * Add new custom shortcode
     * 
     * @since 1.0
     */
    public function add_new_shortcode($atts, $content, $tag)
    { 
        
        return "<span class='wps-spoiler'>" . $content . "</span>";

    }
    
}

new WPS_Shortcode();