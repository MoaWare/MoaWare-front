import { createActions, handleActions } from "redux-actions";

/* 초기 값 */
const initalState = [];

/* 액션 */
const GET_WORKLIST = 'work/GET_WORKLIST';
const POST_INSERTSTART = 'work/POST_INSERTSTART';

export const { work : { getWorklist,postInsertstart }} = createActions({
    [GET_WORKLIST] : (res) => res.data,
    [POST_INSERTSTART] : res => res
});

const workReducer = handleActions(
    {
        [GET_WORKLIST] : (state, { payload }) => ({ myWork : payload }),
        [POST_INSERTSTART] : (state, { payload }) => ({ insert : payload})

    }
, initalState)

export default workReducer;