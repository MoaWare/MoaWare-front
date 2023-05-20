const initialState = {
    btn: false,
    workTime : 0
  };
  
  // setBtnState 함수로 SET_BTN_STATE 액션 객체 생성 
  // btnState 를 payload로 갖는 액션 객체로 반환
  export const setBtnState = (btnState) => {
    return {
      type: 'SET_BTN_STATE',
      payload: btnState
    };
  };


  export const setWorkTime = (workTimeState) => {
    return {
      type : 'WORK_TIME',
      payload :workTimeState
    }
  }
  
  const workTimeReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_BTN_STATE':
        //... 객체의 기존 속성을 만들고 btn의 속성을 action.payload 값으로 변환
        return {
          ...state,
          btn: action.payload,
        };
      case 'WORK_TIME':
        return {
          ...state,
          workTime: action.payload,
        };
      
      default:
        return state;
    }
  };
  
  export default workTimeReducer;