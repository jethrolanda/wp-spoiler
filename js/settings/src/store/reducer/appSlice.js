import { createSlice } from '@reduxjs/toolkit'
import axios from '../../helpers/axios';

export const appSlice = createSlice({
  name: 'spoilerState',
  initialState: {
    modalActive: false,
    modalFormView: 'add', // add, update
    spoilerList: [],
    showConfirm: false,
    selectedSpoilerId: 0,
    spoilerAdded: false,
    spoilerDeleted: false,
    fetchingSpoiler: false,
    totalPages: 0,
    // totalItems: 1,
    activePage: 1,
    spoilertToUpdateData: []
  },
  reducers: {
    setModalActive: (state, action) => {
      state.modalActive = action.payload;
    },
    setModalFormView: (state, action) => {
      state.modalFormView = action.payload;
    },
    setSpoilerList: (state, action) => {
      state.spoilerList = action.payload;
    },
    setShowConfirm: (state, action) => {
      state.showConfirm = action.payload;
    },
    setSelectedSpoilerId: (state, action) => {
      state.selectedSpoilerId = action.payload;
    },
    setSpoilerDeleted: (state, action) => {
      state.spoilerDeleted = action.payload;
    },
    setFetchingSpoiler: (state, action) => {
      state.fetchingSpoiler = action.payload;
    },
    setSpoilerAdded: (state, action) => {
      state.spoilerAdded = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    // setTotalItems: (state, action) => {
    //   state.totalItems = action.payload;
    // },
    setActivePage: (state, action) => {
      state.activePage = action.payload;
    },
    setSpoilerToUpdateData: (state, action) => {
      state.spoilerToUpdateData = action.payload;
    },
  },
})

export const { setModalActive, setModalFormView, setSpoilerList, setShowConfirm, setSelectedSpoilerId, setSpoilerDeleted, setFetchingSpoiler, setSpoilerAdded, setTotalPages, setTotalItems, setActivePage, setSpoilerToUpdateData } = appSlice.actions

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const incrementAsync = (amount) => (dispatch) => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount))
  }, 1000)
}

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCount = (state) => state.spoilerState.value
export const modalActive = (state) => state.spoilerState.modalActive
export const modalFormView = (state) => state.spoilerState.modalFormView
export const spoilerList = (state) => state.spoilerState.spoilerList
export const showConfirm = (state) => state.spoilerState.showConfirm
export const selectedSpoilerId = (state) => state.spoilerState.selectedSpoilerId
export const spoilerDeleted = (state) => state.spoilerState.spoilerDeleted
export const fetchingSpoiler = (state) => state.spoilerState.fetchingSpoiler
export const spoilerAdded = (state) => state.spoilerState.spoilerAdded
export const totalPages = (state) => state.spoilerState.totalPages
// export const totalItems = (state) => state.spoilerState.totalItems
export const activePage = (state) => state.spoilerState.activePage
export const spoilerToUpdateData = (state) => state.spoilerState.spoilerToUpdateData

// Fetch all spoiler list
export const fetchSpoilers = (activePage) => (dispatch) => {
  axios.get(`wp/v2/spoiler?page=${activePage ?? 1}`)
  .then((response) => {
    console.log(response)
    dispatch(setSpoilerList(response.data));
    dispatch(setSpoilerAdded(false));
    dispatch(setFetchingSpoiler(false));
    dispatch(setSpoilerDeleted(false));
    dispatch(setTotalPages(parseInt(response.headers['x-wp-totalpages'])));
    // dispatch(setTotalItems(parseInt(response.headers['x-wp-total'])));
    dispatch(setActivePage(activePage ?? 1));
    
  });
}

// Get a spoiler
export const fetchSpoiler = (id) => (dispatch) => {
  
    axios.get(`wp/v2/spoiler/${id}`)
    .then(response=>{

      if(response.statusText == 'OK'){
        dispatch(setSpoilerToUpdateData(response.data));
      } else {
        dispatch(setSpoilerToUpdateData([]));
      }
      
    });
  
}

// Create a spoiler
export const createSpoiler = (props) => (dispatch) => {
  if(props?.title !== '' && props?.content !== ''){
    const { title, content, setStatus } = props;
    axios.post(`wp/v2/spoiler`, {
      title,
      content,
      status: 'publish'
    })
    .then(response=>{
      if(response.statusText == 'Created') {
        dispatch(setSpoilerAdded(true))
        setStatus('success')
      } else {
        dispatch(setSpoilerAdded(false))
        setStatus('fail')
      }
    });
  }
}

// Update a spoiler
export const updateSpoiler = (props) => (dispatch) => {
  if(props?.title !== '' && props?.content !== ''){
    const { title, content, setStatus, spoilerId } = props;
    axios.post(`wp/v2/spoiler/${spoilerId}`, {
      title,
      content,
      status: 'publish'
    })
    .then(response=>{
      if(response.statusText == 'OK') {
        dispatch(setSpoilerAdded(true))
        setStatus('success')
      } else {
        dispatch(setSpoilerAdded(false))
        setStatus('fail')
      }
    });
  }
}

// Delete a spoiler
export const deleteSpoiler = (id) => (dispatch) => {
  axios.delete(`wp/v2/spoiler/${id}`)
    .then((response) => {
      dispatch(setShowConfirm(false))
      if(response?.statusText == 'OK'){
        dispatch(setSpoilerDeleted(true))
      } else {
        dispatch(setSpoilerDeleted(false))
      }
    });
}

export default appSlice.reducer
