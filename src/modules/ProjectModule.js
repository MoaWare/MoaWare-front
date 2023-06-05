import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = [];


/* 액션 */
const GET_PROJECT = 'project/GET_PROJECT';
const GET_TASKS = 'project/GET_TASKS';
const GET_PROGRESS = 'project/GET_PROGRESS';
const GET_DONE = 'project/GET_DONE';
const GET_DEPTEMPLIST = 'project/GET_DEPTEMPLIST';
const POST_PROJECT = 'project/POST_PROJECT';
const GET_TASK = 'project/GET_TASK';
const POST_TASK = 'project/POST_TASK';
const PUT_TASK = 'project/PUT_TASK';
const DELETE_TASK = 'project/DELETE_TASK';
const PUT_PROJDELETE = 'project/PUT_PROJDELETE';
const PUT_PROGRESSDONE = 'project/PUT_PROGRESSDONE';



export const { project : 
    { getProject, getTasks, getProgress ,getDone, getDeptemplist, postProject, getTask, postTask, putTask, deleteTask, putProjdelete, putProgressdone }} = createActions({
    [GET_PROJECT] : res => res.data,
    [GET_TASKS] : res => res.data,
    [GET_PROGRESS] : res => res,
    [GET_DONE] : res => res,
    [GET_DEPTEMPLIST] : res => res.data,
    [POST_PROJECT] : res => res,
    [GET_TASK] : res => res.data,
    [POST_TASK] : res => res,
    [PUT_TASK] : res => res,
    [DELETE_TASK] : res => res,
    [PUT_PROJDELETE] : res => res,
    [PUT_PROGRESSDONE] : res => res,
}); 


/* 리듀서 */
const projectReducer = handleActions(
    {
        [GET_PROJECT] : (state, { payload }) => ({...state, project : payload }),
        [GET_PROGRESS] : (state, {payload}) => ({ progress : payload }),
        [GET_DONE] : (state, {payload}) => ({ done : payload }),
        [GET_TASKS] : (state, { payload }) => ({...state, tasks : payload }),
        [GET_DEPTEMPLIST] : (state, { payload }) => ({ emps : payload}),
        [POST_PROJECT] : (state, { payload }) => ({ regist : payload }),
        [GET_TASK] : (state, { payload }) => ({ task : payload }),
        [POST_TASK] : (state, { payload }) => ({ post : payload }),
        [PUT_TASK] : (state, { payload }) => ({ put : payload }),
        [DELETE_TASK] : (state, { payload }) => ({ del : payload }),
        [PUT_PROJDELETE] : (state, { payload }) => ({ delProj : payload }),
        [PUT_PROGRESSDONE] : (state, { payload }) => ({ proDone : payload }),
    }
, initialState);


export default projectReducer;
