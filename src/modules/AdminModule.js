import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = {};

/* 액션 */
const POST_ADMIN_EMP = 'emp/POST_ADMIN_EMP';

const PUT_ADMIN_EMP = 'emp/PUT_ADMIN_EMP';
const PUT_ADMIN_EMPDELETE = 'emp/PUT_ADMIN_EMPDELETE';
const RESET_ADMIN_EMP = 'emp/RESET_ADMIN_EMP';




export const { emp: { postAdminEmp, putAdminEmp, putAdminEmpdelete, resetAdminEmp } } = createActions({
      [POST_ADMIN_EMP]: res => res,

      [PUT_ADMIN_EMP]: res => res,
      [PUT_ADMIN_EMPDELETE]: res => res,
      [RESET_ADMIN_EMP]: () => { },
});

/* 리듀서 */
const adminReducer = handleActions({
      [POST_ADMIN_EMP]: (state, { payload }) => ({ regist: payload }),

      [PUT_ADMIN_EMP]: (state, { payload }) => ({ modify: payload }),
      [PUT_ADMIN_EMPDELETE]: (state, { payload }) => ({ del: payload }),
      [RESET_ADMIN_EMP]: (state, action) => initialState,
}, initialState)


export default adminReducer;     