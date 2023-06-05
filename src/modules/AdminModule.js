import { createActions, handleActions } from "redux-actions";

 /* 초기값 */
const initialState = {};

 /* 액션 */
const POST_ADMIN_EMP = 'emp/POST_ADMIN_EMP';
// const RESET_EMP = 'emp/RESET_EMP';
// const POST_FIND_PWD = 'emp/POST_FIND_PWD';
// const POST_FIND_ID = 'emp/POST_FIND_ID'

const PUT_ADMIN_EMP = 'emp/PUT_ADMIN_EMP';
const PUT_ADMIN_EMPDELETE = 'emp/PUT_ADMIN_EMPDELETE';




export const { emp: { postAdminEmp, putAdminEmp ,putAdminEmpdelete } } = createActions({
       [POST_ADMIN_EMP]: res => res,
       //     [RESET_EMP]: () => { },
//     [POST_FIND_PWD]: res => res,
       [PUT_ADMIN_EMP]: res => res,
       [PUT_ADMIN_EMPDELETE]: res => res,

 });

 /* 리듀서 */
 const adminReducer = handleActions({
       [POST_ADMIN_EMP]: (state, { payload }) => ({ regist: payload }),
//     [RESET_EMP]: (state, action) => initialState,
//     [POST_FIND_PWD]: (state, { payload }) => ({ password: payload }),
       [PUT_ADMIN_EMP]:  (state, { payload }) => ({ modify : payload }),        

       [PUT_ADMIN_EMPDELETE]:  (state, { payload }) => ({ del : payload })        
}, initialState)

export default adminReducer;     