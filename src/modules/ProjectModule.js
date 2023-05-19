
import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = [];


/* 액션 */
const GET_PROJECT = 'project/GET_PROJECT';

export const { project : { getProject } } = createActions({
    [GET_PROJECT] : res => res.data,

}); 


/* 리듀서 */
const projectReducer = handleActions(
    {
        [GET_PROJECT] : (state, { payload }) => ({ project : payload }),
    }
, initialState);


export default projectReducer;