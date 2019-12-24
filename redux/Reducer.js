 import {SET_LOGGEDIN_USER} from './ActionTypes';

const initialState = {
  loggedInUser:null,
  rememberdUsername:null,
}

const Reducer = (state=initialState,action) => {
  switch(action.type) {
    case SET_LOGGEDIN_USER:
        return {
          ...state,
          loggedInUser:action.payload
        }
      
  }

  return state;
};

export default Reducer;