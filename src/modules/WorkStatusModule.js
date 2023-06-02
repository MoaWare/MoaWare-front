import { createActions, handleActions } from "redux-actions";

/* 초기 값 */
const initalState = [];

const GET_WORKSTATUS = 'status/GET_WORKSTATUS';
const GET_WORKDAY = 'work/GET_WORKDAY';

export const { status : { getWorkstatus }} = createActions({
    [GET_WORKSTATUS] : res => res.data,
    [GET_WORKDAY] : res => res,
});

const workStatusReducer = handleActions(
    {
        [GET_WORKSTATUS] : (state, { payload }) => ({ status : payload }),
        [GET_WORKDAY] : (state, { payload}) => ({ wDay : payload }),
    }
, initalState)

export default workStatusReducer;