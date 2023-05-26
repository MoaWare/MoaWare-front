import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = [];


/* 액션 */
const GET_PROJECT = 'project/GET_PROJECT';
const GET_TASKS = 'project/GET_TASKS';
const GET_PROGRESS = 'project/GET_PROGRESS';
const GET_DONE = 'project/GET_DONE';
const GET_DEPTLIST = 'project/GET_DEPTLIST';
const GET_DEPTEMPLIST = 'project/GET_DEPTEMPLIST';
const POST_PROJECT = 'project/POST_PROJECT';
const GET_TASK = 'project/GET_TASK';
const POST_TASK = 'project/POST_TASK';


export const { project : 
    { getProject, getTasks, getProgress ,getDone, getDeptlist, getDeptemplist, postProject, getTask, postTask }} = createActions({
    [GET_PROJECT] : res => res.data,
    [GET_TASKS] : res => res.data,
    [GET_PROGRESS] : res => res,
    [GET_DONE] : res => res,
    [GET_DEPTLIST] : res => res.data,
    [GET_DEPTEMPLIST] : res => res.data,
    [POST_PROJECT] : res => res,
    [GET_TASK] : res => res.data,
    [POST_TASK] : res => res.data,
}); 


/* 리듀서 */
const projectReducer = handleActions(
    {
        [GET_PROJECT] : (state, { payload }) => ({ project : payload }),
        [GET_PROGRESS] : (state, {payload}) => ({ progress : payload }),
        [GET_DONE] : (state, {payload}) => ({ done : payload }),
        [GET_TASKS] : (state, { payload }) => ({ tasks : payload }),
        [GET_DEPTLIST] : (state, {payload}) => ({ depts : payload }),
        [GET_DEPTEMPLIST] : (state, { payload }) => ({ emps : payload}),
        [POST_PROJECT] : (state, { payload }) => ({ regist : payload }),
        [GET_TASK] : (state, { payload }) => ({ task : payload }),
        [POST_TASK] : (state, { payload }) => ( {payload} ),
    }
, initialState);


export default projectReducer;
