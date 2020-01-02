 import {SET_LOGGEDIN_USER,SET_SELECTED_ADDRESS,SET_SELECTED_SHORT_ADDRESS, SET_TMP_SELECTED_ADDRESS, SET_TMP_SELECTED_SHORT_ADDRESS,SET_PICKUP_DATE,SET_PICKUP_TIME,SET_PICKUP_PREFERENCE} from './ActionTypes';

const initialState = {
  loggedInUser:null,
  rememberdUsername:null,
  selectedAddress:null,
  selectedShortAddress:null,
  tmpSelectedAddress:null,
  tmpSelectedShortAddress:null,
  selectedPickupDate:null,
  selectedPickupTime:null,
  selectedPickupPreference:null,
  
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
    case SET_SELECTED_SHORT_ADDRESS:
        return {
          ...state,
          selectedShortAddress:action.payload
        }
    case SET_TMP_SELECTED_ADDRESS:
      return {
        ...state,
        tmpSelectedAddress:action.payload
      }
    case SET_TMP_SELECTED_SHORT_ADDRESS:
        return {
          ...state,
          tmpSelectedShortAddress:action.payload
        }        
    case SET_PICKUP_DATE:
      return (
        {...state,
        selectedPickupDate:action.payload}
      )
      case SET_PICKUP_TIME:
          return (
            {...state,
            selectedPickupTime:action.payload}
          )
      case SET_PICKUP_PREFERENCE:  
        return (
          {...state,
          selectedPickupPreference:action.payload}
        )
  }

  return state;
};

export default Reducer;