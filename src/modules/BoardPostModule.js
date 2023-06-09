import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = [];

/* 액션 */
const GET_BOARDPOSTS = 'boardPost/GET_BOARDPOSTS';
const GET_BOARDPOST = 'boardPost/GET_BOARDPOST'
const POST_BOARDPOST = 'boardPost/POST_BOARDPOST';
const PUT_BOARDPOST = 'boardPost/PUT_BOARDPOST';
const PUT_BOARDPOSTDELETE = 'boardPost/PUT_BOARDPOSTDELETE';



export const { boardPost: { getBoardposts, getBoardpost, postBoardpost, putBoardpost, putBoardpostdelete } } = createActions({
    [GET_BOARDPOSTS]: res => res.data,
    [GET_BOARDPOST]: res => res.data,
    [POST_BOARDPOST]: res => res,
    [PUT_BOARDPOST]: res => res,
    [PUT_BOARDPOSTDELETE]: res => res,

});

/* 리듀서 */
const boardPostReducer = handleActions(
    {
        [GET_BOARDPOSTS]: (state, { payload }) => payload,
        [GET_BOARDPOST]: (state, { payload }) => ({ detail: payload }),
        [POST_BOARDPOST]: (state, { payload }) => ({ regist: payload }),
        [PUT_BOARDPOST]: (state, { payload }) => ({ modify: payload }),
        [PUT_BOARDPOSTDELETE]: (state, { payload }) => ({ del : payload })

    }
    , initialState);

export default boardPostReducer;