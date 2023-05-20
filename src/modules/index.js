import { combineReducers } from "redux";
import organizationReducer from "./OrganizationModule";
import employeeReducer from "./EmployeeModule";
import workReducer from "./WorkModule";
import workTimeReducer from "./WorkTimeModule";
import boardPostReducer from "./BoardPostModule";
import paymentReducer from "./PayMentModule";
import projectReducer from "./ProjectModule";

import boardReducer from "./BoardPostModule"

const rootReducer = combineReducers({
  
    boardReducer, organizationReducer, employeeReducer, workReducer ,workTimeReducer, boardPostReducer, projectReducer, paymentReducer

});

export default rootReducer