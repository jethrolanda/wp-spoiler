<?php
if (!defined('WP_UNINSTALL_PLUGIN')) {
    exit();
}

$delete_option = get_option("wps_field_delete_options");
$delete_option  = isset($option['delete']) && !empty($option['delete']) ? $option['delete'] : '';

if ($delete_option == 'on') {

    global $wpdb;

    // DELETES ALL OPTIONS IN THE DB
    $wpdb->query(
        "DELETE FROM $wpdb->options
       WHERE option_name LIKE 'wps_%'
      "
    );

}
