import { createActions, handleActions } from "redux-actions";

/* 초기 값 */
const initalState = [];

/* 액션 */
const GET_WORKLIST = 'work/GET_WORKLIST';
const POST_INSERTSTART = 'work/POST_INSERTSTART';
const PUT_MODIFYTIME = 'work/PUT_MODIFYTIME';

export const { work : { getWorklist, postInsertstart, putModifytime }} = createActions({
    [GET_WORKLIST] : (res) => res.data,
    [POST_INSERTSTART] : res => res,
    [PUT_MODIFYTIME] : res => res
});

const workReducer = handleActions(
    {
        [GET_WORKLIST] : (state, { payload }) => ({ myWork : payload }),
        [POST_INSERTSTART] : (state, { payload }) => ({ insert : payload}),
        [PUT_MODIFYTIME] : (state, { payload }) => ({ modify : payload })

    }
, initalState)

export default workReducer;