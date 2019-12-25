 import {SET_LOGGEDIN_USER,SET_SELECTED_ADDRESS} from './ActionTypes';

const initialState = {
  loggedInUser:null,
  rememberdUsername:null,
  selectedAddress:null,
}

const Reducer = (state=initialState,action) => {
  switch(action.type) {
    case SET_LOGGEDIN_USER:
        return {
          ...state,
          loggedInUser:action.payload
        }
    case SET_SELECTED_ADDRESS:
        return {
          ...state,
          selectedAddress:action.payload
        }
      
  }

  return state;
};

export default Reducer;