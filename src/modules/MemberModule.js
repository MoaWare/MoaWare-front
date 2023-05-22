import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = {};

/* 액션 */
const POST_MEMBER_INFO = 'emp/POST_MEMBER_INFO';
const GET_MEMBER_INFO = 'emp/GET_MEMBER_INFO';

export const { emp : { postMemberInfo, getMemberInfo}} = createActions({
    [POST_MEMBER_INFO] : res => res,
    [GET_MEMBER_INFO] : res => res.data,
})

/* 리듀서 */
const memberReducer = handleActions({
    [POST_MEMBER_INFO] : (state, { payload }) => ({ member : payload }),
    [GET_MEMBER_INFO] : (state, { payload }) => ({ info : payload }),
    
}, initialState)

export default memberReducer;     