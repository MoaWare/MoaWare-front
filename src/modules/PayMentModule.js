import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = {
    subOrg: []
};

/* 액션 */
const GET_PAYMENT = 'pay/GET_PAYMENT';
const GET_PAYMENTFORM = 'pay/GET_PAYMENTFORM';
const POST_PAYMENT = 'pay/POST_PAYMENT'

export const { pay : { getPayment, getPaymentform, postPayment }} = createActions({
    [GET_PAYMENT] : res => res.data,
    [GET_PAYMENTFORM] : res => res.data,
    [POST_PAYMENT] : res => res,
})

/* 리듀서 */
const paymentReducer = handleActions({
    [GET_PAYMENT] : (state, { payload } ) => ({pay : payload}),
    [GET_PAYMENTFORM] : (state, { payload } ) => (payload),
    [POST_PAYMENT] : ( state, { payload }) => payload,

}, initialState)

export default paymentReducer;