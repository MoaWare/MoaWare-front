import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = {
    subOrg: []
};

/* 액션 */
const GET_PAYMENT = 'pay/GET_Payment';
const GET_PAYMENTFORM = 'pay/GET_Paymentform';

export const { pay : { getPayment, getPaymentform }} = createActions({
    [GET_PAYMENT] : res => res.data,
    [GET_PAYMENTFORM] : res => res.data,
})

/* 리듀서 */
const paymentReducer = handleActions({
    [GET_PAYMENT] : (state, { payload } ) => ({pay : payload}),
    [GET_PAYMENTFORM] : (state, { payload } ) => (payload),

}, initialState)

export default paymentReducer;