import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = [];

/* 액션 */
const GET_REVIEWS = 'review/GET_REVIEWS';
const POST_REVIEW = 'review/POST_REVIEW';
const PUT_REVIEW = 'review/PUT_REVIEW';
const DELETE_REVIEW = 'review/DELETE_REVIEW';

export const { review : { getReviews, postReview, putReview, deleteReview }} = createActions({
    [GET_REVIEWS]: res => res.data,
    [POST_REVIEW]: res => res,
    [PUT_REVIEW]: res => res,
    [DELETE_REVIEW]: res => res,
});

/* 리듀서 */
const reviewReducer = handleActions(
    {
        [GET_REVIEWS] : (state, { payload }) => ({ ...state, reviews : payload }),
        [POST_REVIEW] : (state, { payload }) => ({ ...state, regist : payload }),
        [PUT_REVIEW] : (state, { payload }) => ({ ...state, put : payload }),
        [DELETE_REVIEW] : (state, { payload }) => ({ ...state, replDel : payload }),
    }
, initialState);

export default reviewReducer;   