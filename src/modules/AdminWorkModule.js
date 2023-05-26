import { createActions, handleActions } from "redux-actions";

const initialState = [];

const GET_ADMINWORKLIST = 'admin/GET_ADMINWORKLIST';
                          
export const { admin : { getAdminworklist } } = createActions({
    [GET_ADMINWORKLIST] : res => res.data,

}); 

const adminWorkReducer = handleActions(
    {
        [GET_ADMINWORKLIST] : (state , { payload }) => ({ admin : payload}),
}, 
initialState)

export default adminWorkReducer;
