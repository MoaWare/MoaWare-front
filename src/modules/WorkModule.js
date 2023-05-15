import { createActions, handleActions } from "redux-actions";

/* 초기 값 */
const initalState = [];

/* 액션 */
const GET_WORKLIST = 'work/GET_WORKLIST';

export const { work : { getWorklist }} = createActions({
    [GET_WORKLIST] : (res) => res.data
});

const workReducer = handleActions(
    {
        [GET_WORKLIST] : (state, { payload }) => ({ myWork : payload })

    }
, initalState)

export default workReducer;