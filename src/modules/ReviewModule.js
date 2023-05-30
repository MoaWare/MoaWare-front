import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = [];

/* 액션 */
const GET_REVIEWS = 'review/GET_REVIEWS';

export const { review : { getReviews, }} = createActions({
    [GET_REVIEWS]: res => res.data,
});

/* 리듀서 */
const reviewModule = handleActions(
    {
        [GET_REVIEWS] : (state, { payload }) => ({ reviews : payload }),
    }
, initialState);

export default reviewModule;