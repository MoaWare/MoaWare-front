import { createActions, handleActions } from "redux-actions";

const initalState = [];

const GET_DONE = 'leave/GET_DONE';
const POST_LEAVE = 'leave/POST_LEAVE';
const GET_LEAVEREQUESTLIST = 'leave/GET_LEAVEREQUESTLIST'
const GET_REQUEST = 'leave/GET_REQUEST';

export const { leave : { getDone, postLeave, getLeaverequestlist, getRequest }} = createActions({
    [GET_DONE] : (res) => res,
    [POST_LEAVE] : (res) => res,
    [GET_LEAVEREQUESTLIST] : res => res,
    [GET_REQUEST] : res => res.data
})

const leavePayReducer = handleActions(
    {
        [GET_DONE] : (state, { payload }) => ({ leave : payload }),
        [POST_LEAVE] : (state, { payload }) => ({ request : payload }),
        [GET_LEAVEREQUESTLIST] : (state, { payload }) => ({ rqList : payload }),
        [GET_REQUEST] : (state, { payload }) => ({ rDetail : payload }),
    }
, initalState)

export default leavePayReducer;