import {combineReducers} from "redux";
import quiz from "./quiz";
import createReducer from "./create";
import authReducer from "./auth";


export default combineReducers({
    quiz: quiz,
    create: createReducer,
    auth: authReducer
});