const initialState = {
    btn: false,
  };
  
  export const setBtnState = (btnState) => {
    return {
      type: 'SET_BTN_STATE',
      payload: btnState,
    };
  };
  
  const workTimeReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_BTN_STATE':
        return {
          ...state,
          btn: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default workTimeReducer;