import * as alertTypes from "./action.types";

export const alert = {
    alertNormal,
    alertSucces,
    alertError,
    alertWarning,
    alertInfo,
    alertClear,
};

export function alertNormal(message, expirationTime = 5) {
    return {
        type: alertTypes.ALERT_NORMAL,
        message,
        expirationTime
    };
}

export function alertSucces(message, expirationTime = 5) {
    return {
        type: alertTypes.ALERT_SUCCES,
        message,
        expirationTime
    };
}

export function alertError(message, expirationTime = 5) {
    return {
        type: alertTypes.ALERT_ERROR,
        message,
        expirationTime
    };
}

export function alertWarning(message, expirationTime = 5) {
    return {
        type: alertTypes.ALERT_WARNING,
        message,
        expirationTime
    };
}

export function alertInfo(message, expirationTime = 5) {
    return {
        type: alertTypes.ALERT_INFO,
        message,
        expirationTime
    };
}

export function alertClear() {
    return {
        type: alertTypes.ALERT_CLEAR,
    };
}