import { combineReducers } from "redux";
import { UiReducer } from "./UiReducer";

//combinador de reducer
export const rootReducer = combineReducers({
    ui: UiReducer,
    //TODO: AuthReducer,
    //TODO: CalendarREducer
})