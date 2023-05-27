import { createActions, handleActions } from "redux-actions";

const initalState = [];

const GET_DONE = 'leave/GET_DONE';

export const { leave : { getDone}} = createActions({
    [GET_DONE] : (res) => res,
})

const leavePayReducer = handleActions(
    {
        [GET_DONE] : (state, { payload }) => ({ leave : payload }),
    }
, initalState)

export default leavePayReducer;