import { combineReducers } from "redux";
import organizationReducer from "./OrganizationModule";
import employeeReducer from "./EmployeeModule";
import workReducer from "./WorkModule";
import boardPostReducer from "./BoardPostModule";
import workTimeReducer from "./WorkTimeModule";
import projectReducer from "./ProjectModule";


const rootReducer = combineReducers({
  
    boardReducer, organizationReducer, employeeReducer, workReducer ,workTimeReducer, boardPostReducer, projectReducer

});

export default rootReducer