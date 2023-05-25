import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = {
    subOrg: []
};

/* 액션 */
const GET_PAYMENT = 'pay/GET_PAYMENT';
const GET_PAYMENTFORM = 'pay/GET_PAYMENTFORM';
const POST_PAYMENT = 'pay/POST_PAYMENT';
const GET_PAYMENTWAIT = ' pay/GET_PAYMENTWAIT';
const GET_PAYMENTING = ' pay/GET_PAYMENTING';
const GET_PAYMENT_COMPLETE = ' pay/GET_PAYMENT_COMPLETE';
const GET_PAYMENT_REFUSE = ' pay/GET_PAYMENT_REFUSE';

export const { pay : { getPayment, getPaymentform, postPayment, getPaymentwait, getPaymenting 
                , getPaymentComplete, getPaymentRefuse}} = createActions({
    [GET_PAYMENT] : res => res.data,
    [GET_PAYMENTFORM] : res => res.data,
    [POST_PAYMENT] : res => res,
    [GET_PAYMENTWAIT] : res => res.data,
    [GET_PAYMENTING] : res => res.data,
    [GET_PAYMENT_COMPLETE] : res => res.data,
    [GET_PAYMENT_REFUSE] : res => res.data,

})

/* 리듀서 */
const paymentReducer = handleActions({
    [GET_PAYMENT] : (state, { payload } ) => ({...state, pay : payload}),
    [GET_PAYMENTFORM] : (state, { payload } ) => (payload),
    [POST_PAYMENT] : ( state, { payload }) => payload,
    [GET_PAYMENTWAIT] : (state, { payload } ) => ({...state, ...payload}),
   
    [GET_PAYMENTING] :  (state, { payload } ) => payload,
   
   
    [GET_PAYMENT_COMPLETE] : ( state, { payload }) => payload,
    [GET_PAYMENT_REFUSE] : ( state, { payload }) => payload,

}, initialState)

export default paymentReducer;