import { createActions, handleActions } from "redux-actions";

/* 초기 값 */
const initalState = [];

const GET_WORKSTATUS = 'status/GET_WORKSTATUS';

export const { status : { getWorkstatus }} = createActions({
    [GET_WORKSTATUS] : res => res.data,
});

const workStatusReducer = handleActions(
    {
        [GET_WORKSTATUS] : (state, { payload }) => ({ status : payload }),
    }
, initalState)

export default workStatusReducer;