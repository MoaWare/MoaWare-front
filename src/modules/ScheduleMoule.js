import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = [];

/* 액션 */
const GET_SCHEDULE = 'schedule/GET_SCHEDULE';

export const { schedule: { getSchedule } } = createActions({
    [GET_SCHEDULE]: res => res.data
});

/* 리듀서 */
const scheduleReducer = handleActions(
    {
        [GET_SCHEDULE] : (state, { payload }) => ({ schedule : payload })
    }
, initialState);

export default scheduleReducer;