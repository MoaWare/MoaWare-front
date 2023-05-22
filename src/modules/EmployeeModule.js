import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = {};

/* 액션 */
const POST_LOGIN = 'emp/POST_LOGIN';
const RESET_EMP = 'emp/RESET_EMP';
const POST_FIND_PWD = 'emp/POST_FIND_PWD';
const POST_FIND_ID = 'emp/POST_FIND_ID';
const GET_HEADER_NAME = 'emp/GET_HEADER_NAME';



export const { emp : { postLogin,resetEmp, postFindPwd, postFindId, getHeaderName}} = createActions({
    [POST_LOGIN] : res => res,
    [RESET_EMP] : () => {},
    [POST_FIND_PWD] : res => res,
    [POST_FIND_ID] : res => res,
    [GET_HEADER_NAME] : res => res.data,
})

/* 리듀서 */
const employeeReducer = handleActions({
    [POST_LOGIN] : (state, { payload } ) => ({ login : payload }),
    [RESET_EMP] : (state, action) => initialState,
    [POST_FIND_PWD] : (state, { payload }) => ({ password : payload}),
    [POST_FIND_ID] : (state, { payload }) => ({ id : payload }),
    [GET_HEADER_NAME] : (state, { payload }) => ({ name : payload }),
    
}, initialState)

export default employeeReducer;     