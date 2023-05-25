import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = [];

/* 액션 */
const GET_SCHEDULES = 'schedule/GET_SCHEDULES';
const GET_SCHEDULE = 'schedule/GET_SCHEDULE';

export const { schedule: { getSchedules, getSchedule } } = createActions({
    [GET_SCHEDULES]: res => res.data,
    [GET_SCHEDULE]: res => res.data
});

/* 리듀서 */
const scheduleReducer = handleActions(
    {
        [GET_SCHEDULES] : (state, { payload }) => ({ schedules : payload }),
        [GET_SCHEDULE] : (state, { payload }) => ({ schedule : payload })
    }
, initialState);

export default scheduleReducer;