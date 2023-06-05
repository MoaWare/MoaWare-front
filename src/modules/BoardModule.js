import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = [];

/* 액션 */
    const GET_BOARDS = 'board/GET_BOARDS';
//  const GET_BOARD = 'board/GET_BOARD'
    const POST_BOARD = 'board/POST_BOARD';
    const PUT_BOARD = 'board/PUT_BOARD';
    const PUT_BOARDDELETE = 'board/PUT_BOARDDELETE';

export const { board: { getBoards, postBoard, putBoard, putBoarddelete} } = createActions({
    [GET_BOARDS]: res => res.data,
//  [GET_BOARD]: res => res.data,
    [POST_BOARD]: res => res,
    [PUT_BOARD]: res => res,
    [PUT_BOARDDELETE]: res => res,

});

/* 리듀서 */
const boardReducer = handleActions(
    {
        [GET_BOARDS]: (state, { payload }) => payload,
    //  [GET_BOARD]: (state, { payload }) => ({ detail: payload }),
        [POST_BOARD]: (state, { payload }) => ({ regist: payload }),
        [PUT_BOARD]: (state, { payload }) => ({ modify: payload }),
        [PUT_BOARDDELETE]: (state, { payload }) => ({ del: payload })
    }
    , initialState);

export default boardReducer;