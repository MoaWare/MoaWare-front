
import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = [];


/* 액션 */
const GET_PROJECT = 'project/GET_PROJECT';





const GET_PROGRESS = 'project/GET_PROGRESS';
const GET_DONE = 'project/GET_DONE';




export const { project : { getProject                     , getProgress ,getDone } } = createActions({
    [GET_PROJECT] : res => res.data,





    [GET_PROGRESS] : res => res,
    [GET_DONE] : res => res,
}); 


/* 리듀서 */
const projectReducer = handleActions(
    {
        [GET_PROJECT] : (state, { payload }) => ({ project : payload }),



        [GET_PROGRESS] : (state, {payload}) => ({ progress : payload }),
        [GET_DONE] : (state, {payload}) => ({ done : payload }),

    }
, initialState);


export default projectReducer;