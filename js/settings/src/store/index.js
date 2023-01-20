import { configureStore } from '@reduxjs/toolkit'
import spoilerReducer from './reducer/appSlice'
import settingsReducer from './reducer/settingsSlice'


export default configureStore({
  reducer: {
    spoilerState: spoilerReducer,
    settingsState: settingsReducer
  },
})