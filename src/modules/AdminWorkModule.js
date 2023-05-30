import { createActions, handleActions } from "redux-actions";

const initialState = [];

const GET_ADMINWORKLIST = 'admin/GET_ADMINWORKLIST';
const PUT_WORKSTATUSMODIFY = 'admin/PUT_WORKSTATUSMODIFY';
const GET_EMPNAMELIST = 'admin/GET_EMPNAMELIST'
                          
export const { admin : { getAdminworklist, putWorkstatusmodify, getEmpnamelist } } = createActions({
    [GET_ADMINWORKLIST] : res => res.data,
    [PUT_WORKSTATUSMODIFY] : res => res,
    [GET_EMPNAMELIST] : res => res.data,
}); 

const adminWorkReducer = handleActions(
    {
        [GET_ADMINWORKLIST] : (state , { payload }) => ({ admin : payload}),
        [PUT_WORKSTATUSMODIFY] : (state , { payload }) => ({ modify : payload}),
        [GET_EMPNAMELIST] : (state, { payload }) => ({ name : payload }),
}, 
initialState)

export default adminWorkReducer;
