import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = {};

/* 액션 */
const POST_LOGIN = 'emp/POST_LOGIN';
const RESET_EMP = 'emp/RESET_EMP'
const POST_FIND_ACCOUNT = 'emp/POST_FINDID'

export const { emp : { postLogin,resetEmp, postFindAccount }} = createActions({
    [POST_LOGIN] : res => res,
    [RESET_EMP] : () => {},
    [POST_FIND_ACCOUNT] : res => res
})

/* 리듀서 */
const employeeReducer = handleActions({
    [POST_LOGIN] : (state, { payload } ) => ({ login : payload}),
    [RESET_EMP] : (state, action) => initialState,
    [POST_FIND_ACCOUNT] : (state = initialState, { payload }) => ({ getAccount : payload})
}, initialState)

export default employeeReducer;     