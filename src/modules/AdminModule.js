import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = {};

/* 액션 */
const POST_LOGIN = 'emp/POST_LOGIN';
const RESET_EMP = 'emp/RESET_EMP';
const POST_FIND_PWD = 'emp/POST_FIND_PWD';
const POST_FIND_ID = 'emp/POST_FIND_ID'


export const { emp: { postLogin, resetEmp, postFindPwd, postFindId } } = createActions({
    [POST_LOGIN]: res => res,
    [RESET_EMP]: () => { },
    [POST_FIND_PWD]: res => res,
    [POST_FIND_ID]: res => res,
})

/* 리듀서 */
const employeeReducer = handleActions({
    [POST_LOGIN]: (state, { payload }) => ({ login: payload }),
    [RESET_EMP]: (state, action) => initialState,
    [POST_FIND_PWD]: (state, { payload }) => ({ password: payload }),
    [POST_FIND_ID]: (state, { payload }) => ({ id: payload })
}, initialState)

export default employeeReducer;     