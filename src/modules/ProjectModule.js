
import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = [];


/* 액션 */
const GET_PROJECT = 'project/GET_PROJECT';
const GET_TASKS = 'project/GET_TASKS';
const GET_TASK_TODO = 'project/GET_TASK_TODO';
const GET_TASK_ING = 'project/GET_TASK_ING';
const GET_TASK_DONE = 'project/GET_TASK_DONE';
const GET_PROGRESS = 'project/GET_PROGRESS';
const GET_DONE = 'project/GET_DONE';




export const { project : { getProject                     , getProgress ,getDone } } = createActions({

export const { project : { getProject, getTasks, getTaskDone, getTaskIng, getTaskTodo , getProgress ,getDone }} = createActions({
    [GET_PROJECT] : res => res.data,
    [GET_TASKS] : res => res.data,
    [GET_TASK_TODO] : res => res.data,
    [GET_TASK_ING] : res => res.data,
    [GET_TASK_DONE] : res => res.data,
    [GET_PROGRESS] : res => res,
    [GET_DONE] : res => res,
}); 


/* 리듀서 */
const projectReducer = handleActions(
    {
        [GET_PROJECT] : (state, { payload }) => ({ project : payload }),
        [GET_PROGRESS] : (state, {payload}) => ({ progress : payload }),
        [GET_DONE] : (state, {payload}) => ({ done : payload }),
        [GET_TASKS] : (state, { payload }) => ({ tasks : payload }),
        [GET_TASK_TODO] : (state, {payload}) => ({ todo : payload }),
        [GET_TASK_ING] : (state, {payload}) => ({ ing : payload }),
        [GET_TASK_DONE] : (state, {payload}) => ({ done : payload }),

    }
, initialState);


export default projectReducer;