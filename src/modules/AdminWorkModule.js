import { createActions, handleActions } from "redux-actions";

const initialState = [];

const GET_ADMINWORKLIST = 'admin/GET_ADMINWORKLIST';
const PUT_WORKSTATUSMODIFY = 'admin/PUT_WORKSTATUSMODIFY';
                          
export const { admin : { getAdminworklist, putWorkstatusmodify } } = createActions({
    [GET_ADMINWORKLIST] : res => res.data,
    [PUT_WORKSTATUSMODIFY] : res => res,
}); 

const adminWorkReducer = handleActions(
    {
        [GET_ADMINWORKLIST] : (state , { payload }) => ({ admin : payload}),
        [PUT_WORKSTATUSMODIFY] : (state , { payload }) => ({ modify : payload}),
}, 
initialState)

export default adminWorkReducer;
