import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = {};

/* 액션 */
const POST_LOGIN = 'emp/POST_LOGIN';
const RESET_EMP = 'emp/RESET_EMP'

export const { emp : { postLogin,resetEmp }} = createActions({
    [POST_LOGIN] : res => res.data,
    [RESET_EMP] : () => {}
})

/* 리듀서 */
const employeeReducer = handleActions({
    [POST_LOGIN] : (state, { payload } ) => ({ login : payload}),
    [RESET_EMP] : (state, action) => initialState,
}, initialState)

export default employeeReducer;     