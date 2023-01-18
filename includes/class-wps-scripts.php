<?php

/**
 * Scripts class
 *
 * @since   1.0
 */

defined('ABSPATH') || exit;

class WPS_Scripts
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
     */
    public function __construct()
    {
        add_action('admin_enqueue_scripts', array($this, 'load_back_end_styles_and_scripts'), 10, 1);
        add_action('wp_enqueue_scripts', array($this, 'load_front_end_styles_and_scripts'), 11);
        
    }

    /**
     * All backend scripts
     *
     * @since 1.0
     * @access public
     */
    public function load_back_end_styles_and_scripts()
    {
        // $asset_file = include(WPS_PLUGIN_URL . '/js/settings/build/index.asset.php');

        // wp_register_script(
        //     'myguten-block',
        //     plugins_url( 'build/index.js', __FILE__ ),
        //     $asset_file['dependencies'],
        //     $asset_file['version']
        // );
        if(isset($_GET['page']) && $_GET['page'] == 'spoiler_settings'){
            wp_enqueue_style('spoiler-setting-style', WPS_PLUGIN_URL . '/js/settings/build/index.css');
            wp_enqueue_script('spoiler-setting-script', WPS_PLUGIN_URL . '/js/settings/build/index.js', array('wp-element', 'wp-i18n'), '1.0.0', true);
            wp_localize_script('spoiler-setting-script', 'wps_settings_i18n', array(
                'rest_url'   => esc_url_raw( get_rest_url() ),
                'nonce' => wp_create_nonce( 'wp_rest' )
            ));
        }
        
        wp_enqueue_style('spoiler-plugin-style', WPS_PLUGIN_URL . '/css/style.css');
        
    }

    /**
     * All frontend scripts
     *
     * @since 1.0
     * @access public
     */
    public function load_front_end_styles_and_scripts()
    {
        wp_enqueue_style('spoiler-plugin-style', WPS_PLUGIN_URL . '/css/style.css');
    }

}

new WPS_Scripts();
