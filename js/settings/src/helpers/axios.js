import axios from 'axios';

export default axios.create({
  baseURL: wps_settings_i18n.rest_url,
  timeout: 5000,
  headers: { "X-WP-Nonce" : wps_settings_i18n.nonce }
});

export const ajaxAxios = axios.create({
  baseURL: wps_settings_i18n.ajax,
  timeout: 5000,
  data: { "settings_nonce" : wps_settings_i18n.settings_nonce }
});