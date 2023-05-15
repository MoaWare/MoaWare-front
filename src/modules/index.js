import { combineReducers } from "redux";
import organizationReducer from "./OrganizationModule";
import employeeReducer from "./EmployeeModule";

const rootReducer = combineReducers({
    organizationReducer,employeeReducer
});

export default rootReducer