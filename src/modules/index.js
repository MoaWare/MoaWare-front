import { combineReducers } from "redux";
import organizationReducer from "./OrganizationModule";
import employeeReducer from "./EmployeeModule";
import workReducer from "./WorkModule";
import boardPostReducer from "./BoardPostModule";


const rootReducer = combineReducers({
    organizationReducer, employeeReducer, workReducer, boardPostReducer
});

export default rootReducer