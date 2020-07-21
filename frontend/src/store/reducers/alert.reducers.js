import * as alertTypes from "../actions/action.types";
import {
    updateObject
} from "../utility";


const initialState = {
    message_type: null,
    message: null,
    open: null,
    expirationTime: null
};

const alertNormal = (state, action) => {
    return updateObject(state, {
        message_type: 'alert',
        message: action.message,
        open: true,
        expirationTime: action.expirationTime * 1000
    });
};

const alertSucces = (state, action) => {
    return updateObject(state, {
        message_type: 'alert-success',
        message: action.message,
        open: true,
        expirationTime: action.expirationTime * 1000
    });
};

const alertError = (state, action) => {
    return updateObject(state, {
        message_type: 'alert-error',
        message: action.message,
        open: true,
        expirationTime: action.expirationTime * 1000
    });
};

const alertInfo = (state, action) => {
    return updateObject(state, {
        message_type: 'alert-info',
        message: action.message,
        open: true,
        expirationTime: action.expirationTime * 1000
    });
};

const alertWarning = (state, action) => {
    return updateObject(state, {
        message_type: 'alert-warning',
        message: action.message,
        open: true,
        expirationTime: action.expirationTime * 1000
    });
};



export default function alertReducer(state = initialState, action) {
    switch (action.type) {
        case alertTypes.ALERT_NORMAL:
            return alertNormal(state, action);
        case alertTypes.ALERT_SUCCES:
            return alertSucces(state, action);
        case alertTypes.ALERT_ERROR:
            return alertError(state, action);
        case alertTypes.ALERT_WARNING:
            return alertWarning(state, action);
        case alertTypes.ALERT_INFO:
            return alertInfo(state, action);
        case alertTypes.ALERT_CLEAR:
            return initialState
        default:
            return state
    }
}