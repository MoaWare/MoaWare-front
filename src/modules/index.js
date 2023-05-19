import { combineReducers } from "redux";
import boardReducer from "./BoardPostModule";
import organizationReducer from "./OrganizationModule";
import employeeReducer from "./EmployeeModule";
import workReducer from "./WorkModule";
import workTimeReducer from "./WorkTimeModule";


const rootReducer = combineReducers({
    boardReducer, organizationReducer, employeeReducer, workReducer ,workTimeReducer
});

export default rootReducer