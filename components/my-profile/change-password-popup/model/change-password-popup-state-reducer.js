export const CHANGE_PASSWORD_POPUP_STATE_ACTIONS = {
    UPDATE_FIELD: "update-field",
    SET_ERRORS: "set-errors",
    SET_ERROR_MESSAGE: "set-error-message",
    SET_SUCCESS_MESSAGE: "set-success-message",
    CLEAR_PASSWORD_EQUALITY: "clear-password-equality"
}

export function initChangePasswordPopupState({}) {
    return {
        errorMessage: null,
        successMessage: null,
        data: {
            oldPassword: "",
            newPassword: "",
            confirmNewPassword: "",
        },
        errors: {
            oldPasswordError: "",
            newPasswordError: "",
            confirmNewPasswordError: "",
            passwordsEquality: ""
        }
    }
}

export function changePasswordPopupStateReducer(state, action) {
    switch(action.type) {
        case CHANGE_PASSWORD_POPUP_STATE_ACTIONS.SET_ERROR_MESSAGE: {
            return {
                ...state,
                errorMessage: action.errorMessage
            }
        }
        case CHANGE_PASSWORD_POPUP_STATE_ACTIONS.SET_SUCCESS_MESSAGE: {
            return {
                ...state,
                successMessage: action.successMessage
            }
        }
        case CHANGE_PASSWORD_POPUP_STATE_ACTIONS.UPDATE_FIELD: {
            return {
                ...state,
                data: {
                    ...state.data,
                    [action.field]: action.value
                }
            }
        }
        case CHANGE_PASSWORD_POPUP_STATE_ACTIONS.SET_ERRORS: {
            return {
                ...state,
                errors: action.errors
            }
        }
        case CHANGE_PASSWORD_POPUP_STATE_ACTIONS.CLEAR_PASSWORD_EQUALITY: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    passwordsEquality: null
                }
            }
        }
        default: {
            return state;
        }
    }
}