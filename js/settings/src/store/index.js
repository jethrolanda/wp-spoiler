import { configureStore } from '@reduxjs/toolkit'
import spoilerReducer from './reducer/appSlice'


export default configureStore({
  reducer: {
    spoilerState: spoilerReducer
  },
})