import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = {};

/* 액션 */
const GET_ORGANIZATION = 'org/GET_ORGANIZATION';

export const { org : { getOrganization }} = createActions({
    [GET_ORGANIZATION] : res => res.data
})

/* 리듀서 */
const organizationReducer = handleActions({
    [GET_ORGANIZATION] : (state, { payload } ) => ({org : payload})

}, initialState)

export default organizationReducer;