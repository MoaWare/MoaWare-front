import { createActions, handleActions } from "redux-actions";

const initalState = [];

const GET_DONE = 'leave/GET_DONE';
const POST_LEAVE = 'leave/POST_LEAVE';

export const { leave : { getDone, postLeave}} = createActions({
    [GET_DONE] : (res) => res,
    [POST_LEAVE] : (res) => res,
})

const leavePayReducer = handleActions(
    {
        [GET_DONE] : (state, { payload }) => ({ leave : payload }),
        [POST_LEAVE] : (state, { payload }) => ({ request : payload }),
    }
, initalState)

export default leavePayReducer;