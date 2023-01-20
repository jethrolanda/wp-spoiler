import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
const qs = require("qs");

export const settingsSlice = createSlice({
  name: 'settingsState',
  initialState: {
    loading: null,
    settings: []
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSettings: (state, action) => {
      state.settings = action.payload;
    }
  },
})

export const { setSettings, setLoading } = settingsSlice.actions


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const settings = (state) => state.settingsState.settings
export const loading = (state) => state.settingsState.loading

// Get a settings
export const fetchSettings = () => (dispatch) => {
  
  axios.post(wps_settings_i18n.ajax_url, qs.stringify({
    action: "wps_fetch_settings",
    nonce: wps_settings_i18n.settings_nonce,
    data: []
  })).then(({data}) => {
    dispatch(setSettings(data?.data));
    dispatch(setLoading(false));
  });
  
}

// Get a spoiler
export const saveSettings = ({data, cb}) => (dispatch) => {
  console.log(data)
  axios.post(wps_settings_i18n.ajax_url, qs.stringify({
    action: "wps_save_settings",
    nonce: wps_settings_i18n.settings_nonce,
    data
  })).then(({data}) => {
    dispatch(setSettings(data?.data));
    cb();
  });

}

export default settingsSlice.reducer
