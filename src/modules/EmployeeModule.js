import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = {};

/* 액션 */
const POST_LOGIN = 'emp/POST_LOGIN';
const RESET_EMP = 'emp/RESET_EMP';
const POST_FIND_PWD = 'emp/POST_FIND_PWD';
const POST_FIND_ID = 'emp/POST_FIND_ID';
const GET_HEADER_NAME = 'emp/GET_HEADER_NAME';

const GET_EMPLOYEES = 'emp/GET_EMPLOYEES';
const GET_EMPLOYEE = 'emp/GET_EMPLOYEE';

const GET_DEPTLIST = 'emp/GET_DEPTLIST';



export const { emp : { postLogin,resetEmp, postFindPwd, postFindId, getHeaderName, getEmployees, getEmployee, getDeptlist }} = createActions({
    [POST_LOGIN] : res => res,
    [RESET_EMP] : () => {},
    [POST_FIND_PWD] : res => res,
    [POST_FIND_ID] : res => res,
    [GET_HEADER_NAME] : res => res.data,
    
    [GET_EMPLOYEES] : res => res.data,
    [GET_EMPLOYEE] : res => res.data,

    [GET_DEPTLIST] : res => res.data,

})

/* 리듀서 */
const employeeReducer = handleActions({
    [POST_LOGIN] : (state, { payload } ) => ({ login : payload }),
    [RESET_EMP] : (state, action) => initialState,
    [POST_FIND_PWD] : (state, { payload }) => ({ password : payload}),
    [POST_FIND_ID] : (state, { payload }) => ({ id : payload }),
    [GET_HEADER_NAME] : (state, { payload }) => ({...state, name : payload }),

    [GET_EMPLOYEES] : (state, { payload }) => payload ,
    [GET_EMPLOYEE] : (state, { payload }) => ({...state, detail : payload }),

    [GET_DEPTLIST] : (state, {payload}) => ({ depts : payload }),

    
}, initialState)

export default employeeReducer;     