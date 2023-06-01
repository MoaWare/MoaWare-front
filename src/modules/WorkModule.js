import { createActions, handleActions } from "redux-actions";

/* 초기 값 */
const initalState = [];

/* 액션 */
const GET_WORKLIST = 'work/GET_WORKLIST';
const POST_INSERTSTART = 'work/POST_INSERTSTART';
const PUT_QUITTIME = 'work/PUT_QUITTIME';
const GET_WORKDAY = 'work/GET_WORKDAY';

export const { work : { getWorklist, postInsertstart, putQuittime, getWorkday }} = createActions({
    [GET_WORKLIST] : (res) => res.data,
    [POST_INSERTSTART] : res => res,
    [PUT_QUITTIME] : res => res,
    [GET_WORKDAY] : res => res,
});

const workReducer = handleActions(
    {
        [GET_WORKLIST] : (state, { payload }) => ({ myWork : payload }),
        [POST_INSERTSTART] : (state, { payload }) => ({ insert : payload}),
        [PUT_QUITTIME] : (state, { payload }) => ({ quit : payload }),
        [GET_WORKDAY] : (state, { payload}) => ({ wDay : payload }),
    }
, initalState)

export default workReducer;