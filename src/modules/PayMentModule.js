import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = {
    subOrg: []
};

/* 액션 */
const GET_Payment = 'pay/GET_Payment';

export const { pay : { getPayment }} = createActions({
    [GET_Payment] : res => res.data,
})

/* 리듀서 */
const paymentReducer = handleActions({
    [GET_Payment] : (state, { payload } ) => ({pay : payload}),


}, initialState)

export default paymentReducer;