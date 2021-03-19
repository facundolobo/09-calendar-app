import { combineReducers } from "redux";
import { calendarReducer } from "./calendarReducer";
import { UiReducer } from "./UiReducer";

//combinador de reducer
export const rootReducer = combineReducers({
    ui: UiReducer,
    calendar: calendarReducer
    //TODO: CalendarREducer
})