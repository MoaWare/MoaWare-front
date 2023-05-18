import { combineReducers } from "redux";
import boardReducer from "./BoardPostModule";
import organizationReducer from "./OrganizationModule";
import employeeReducer from "./EmployeeModule";
import workReducer from "./WorkModule";


const rootReducer = combineReducers({
    boardReducer, organizationReducer, employeeReducer, workReducer
});

export default rootReducer