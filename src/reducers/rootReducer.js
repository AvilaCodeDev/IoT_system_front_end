import { combineReducers } from "redux";
import { deviceReducer } from "./deviceReducer";
import { uiReducer } from "./uiReducer";


export const rootReducer = combineReducers({
    devices: deviceReducer,
    ui: uiReducer
});