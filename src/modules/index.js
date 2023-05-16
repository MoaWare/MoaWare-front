import { combineReducers } from "redux";
import organizationReducer from "./OrganizationModule";
import employeeReducer from "./EmployeeModule";
import workReducer from "./WorkModule";


const rootReducer = combineReducers({
    organizationReducer,employeeReducer, workReducer
});

export default rootReducer