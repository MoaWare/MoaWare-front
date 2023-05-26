import { combineReducers } from "redux";
import organizationReducer from "./OrganizationModule";
import employeeReducer from "./EmployeeModule";
import workReducer from "./WorkModule";
import workTimeReducer from "./WorkTimeModule";
import boardPostReducer from "./BoardPostModule";
import paymentReducer from "./PayMentModule";
import projectReducer from "./ProjectModule";
import memberReducer from "./MemberModule";
import scheduleReducer from "./ScheduleModule";
import boardReducer from "./BoardPostModule"
import leaveReducer from "./LeaveModule";
import leavePayReducer from "./LeavePayModule";
import adminWorkReducer from "./AdminWorkModule";
const rootReducer = combineReducers({
  
    boardReducer, 
    organizationReducer, 
    employeeReducer, 
    workReducer ,
    workTimeReducer, 
    boardPostReducer, 
    projectReducer, 
    paymentReducer, 
    memberReducer,
    scheduleReducer,
    leaveReducer,
    leavePayReducer,
    adminWorkReducer
});

export default rootReducer