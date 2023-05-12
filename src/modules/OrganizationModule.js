import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = {};

/* 액션 */
const GET_ORGANIZATION = 'org/GET_ORGANIZATION';

export const { org : { getOrganization }} = createActions({
    [GET_ORGANIZATION] : res => res
})

/* 리듀서 */
const organizationReducer = handleActions({

}, initialState)

export default organizationReducer;