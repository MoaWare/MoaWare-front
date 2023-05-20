import { combineReducers } from "redux";
import organizationReducer from "./OrganizationModule";
import employeeReducer from "./EmployeeModule";
import workReducer from "./WorkModule";
import workTimeReducer from "./WorkTimeModule";
import boardPostReducer from "./BoardPostModule";


const rootReducer = combineReducers({
    organizationReducer, employeeReducer, workReducer, workTimeReducer, boardPostReducer

});

export default rootReducer