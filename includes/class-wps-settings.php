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
class WPS_Settings
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

        // Add custom menu to wp admin menu
        add_action('admin_menu', array($this, 'custom_menu'), 10);
        
        // Fetch setting via ajax 
        add_action("wp_ajax_wps_fetch_settings", array($this, 'wps_fetch_settings'));

        // Save setting via ajax 
        add_action("wp_ajax_wps_save_settings", array($this, 'wps_save_settings'));

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
        <div class="wrap">
            <div id="spoiler-settings">
                <h2>Loading...</h2>
            </div>
        </div><?php
    }
    
    /**
     * Fetch settings.
     * 
     * @since 1.0
     */
    public function wps_fetch_settings()
    {
        
        if (!defined('DOING_AJAX') || !DOING_AJAX) {
            wp_die();
        }
        
        /**
         * Verify nonce if its the same as we created, if not then we return
         */
        if (isset($_POST['nonce']) && !wp_verify_nonce($_POST['nonce'], 'settings_nonce')) {
            wp_die();
        }
        
        $data = get_option('wps_setting', array());
        
        wp_send_json(array(
            'status' => 'success',
            'data' => $data
        ));
        
    }

    /**
     * Save settings.
     * 
     * @since 1.0
     */
    public function wps_save_settings()
    {
        
        if (!defined('DOING_AJAX') || !DOING_AJAX) {
            wp_die();
        }

        /**
         * Verify nonce if its the same as we created, if not then we return
         */
        if (isset($_POST['nonce']) && !wp_verify_nonce($_POST['nonce'], 'settings_nonce')) {
            wp_die();
        }  

        $data = isset($_POST['data']) && is_array($_POST['data']) ? $_POST['data'] : array();
        update_option('wps_setting', $data);
        error_log(print_r($data,true));
        wp_send_json(array(
            'status' => 'success',
            'data' => $data
        ));
        
    }
    

}

new WPS_Settings();
