import { createActions, handleActions } from "redux-actions";

const initalState = [];

const GET_YEAR = 'leave/GET_YEAR';
const POST_LEAVE = 'leave/POST_LEAVE'

export const { leave : { getYear, postLeave }} = createActions({
    [GET_YEAR] : (res) => res,
    [POST_LEAVE] : res => res,
})

const leaveReducer = handleActions(
    {
        [GET_YEAR] : (state, { payload }) => ({ lYear : payload }),
        [POST_LEAVE] : (state, { payload }) => ({ lInsert : payload }),
    }
, initalState)

export default leaveReducer;