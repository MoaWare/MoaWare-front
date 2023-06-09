import { combineReducers } from "redux";
import organizationReducer from "./OrganizationModule";
import employeeReducer from "./EmployeeModule";
import workReducer from "./WorkModule";
import workStatusReducer from "./WorkStatusModule";
import workTimeReducer from "./WorkTimeModule";
import boardPostReducer from "./BoardPostModule";
import paymentReducer from "./PayMentModule";
import projectReducer from "./ProjectModule";
import memberReducer from "./MemberModule";
import scheduleReducer from "./ScheduleModule";
import leaveReducer from "./LeaveModule";
import leavePayReducer from "./LeavePayModule";
import reviewReducer from "./ReviewModule";
import adminReducer from "./AdminModule";
import boardReducer from "./BoardModule";
import adminWorkReducer from "./AdminWorkModule";

const rootReducer = combineReducers({
    adminReducer,
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
    reviewReducer,
    boardReducer,
    adminWorkReducer,
    workStatusReducer,
});

export default rootReducer
