import { combineReducers } from "redux";
import organizationReducer from "./OrganizationModule";

const rootReducer = combineReducers({
    organizationReducer
});

export default rootReducer