import { combineReducers } from "redux";
import boardReducer from "./BoardPostModule";
import organizationReducer from "./OrganizationModule";
import employeeReducer from "./EmployeeModule";
import workReducer from "./WorkModule";
import workTimeReducer from "./WorkTimeModule";
import paymentReducer from "./PayMentModule";


const rootReducer = combineReducers({
    boardReducer, organizationReducer, employeeReducer, workReducer ,workTimeReducer, paymentReducer
});

export default rootReducer