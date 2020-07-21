import {
    combineReducers
} from 'redux';
import authReducer from "./auth.reducers";
import alertReducer from "./alert.reducers"
const rootReducer = combineReducers({
    auth: authReducer,
    alert: alertReducer
});

export default rootReducer;