import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = {
    subOrg: []
};

/* 액션 */
const GET_ORGANIZATION = 'org/GET_ORGANIZATION';
const GET_ORGANIZATIONSUB = 'org/GET_ORGANIZATIONSUB';

export const { org : { getOrganization, getOrganizationsub }} = createActions({
    [GET_ORGANIZATION] : res => res.data,
    [GET_ORGANIZATIONSUB] : res => res.data
})

/* 리듀서 */
const organizationReducer = handleActions({
    [GET_ORGANIZATION] : (state, { payload } ) => ({org : payload}),
    [GET_ORGANIZATIONSUB]: (state, { payload }) => ({
        ...state,
        subOrg: payload
      }),

}, initialState)

export default organizationReducer;