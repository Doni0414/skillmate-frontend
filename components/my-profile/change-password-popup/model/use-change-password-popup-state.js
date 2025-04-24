import { useReducer } from "react";
import { CHANGE_PASSWORD_POPUP_STATE_ACTIONS, changePasswordPopupStateReducer, initChangePasswordPopupState } from "./change-password-popup-state-reducer";
import { validateChangePasswordFormData } from "./validate-change-password-form-data";
import { hasErrors } from "./has-errors";
import { changePassword } from "../../../api";

export function useChangePasswordPopupState(userInfo, onClose) {
    const [changePasswordState, dispatch] = useReducer(changePasswordPopupStateReducer, {}, initChangePasswordPopupState);
    const handleOnFieldChange = (e) => {
        dispatch({ type: CHANGE_PASSWORD_POPUP_STATE_ACTIONS.UPDATE_FIELD, field: e.target.name, value: e.target.value })
    }

    const handleClickSaveButton = (e) => {
        e.preventDefault();
        const errors = validateChangePasswordFormData(changePasswordState.data);
        if (hasErrors(errors)) {
            dispatch({ type: CHANGE_PASSWORD_POPUP_STATE_ACTIONS.SET_ERRORS, errors: errors});
            setTimeout(() => {
                dispatch({ type: CHANGE_PASSWORD_POPUP_STATE_ACTIONS.CLEAR_PASSWORD_EQUALITY, errors: errors});
            }, 10_000);
            return;
        }
        changePassword(changePasswordState.data.oldPassword, changePasswordState.data.newPassword)
        .then(response => {
            dispatch({ type: CHANGE_PASSWORD_POPUP_STATE_ACTIONS.SET_SUCCESS_MESSAGE, successMessage: "Password has been changed successfully!"});
            setTimeout(() => {
                dispatch({ type: CHANGE_PASSWORD_POPUP_STATE_ACTIONS.SET_SUCCESS_MESSAGE, successMessage: null});
                onClose();
            }, 2_000);
        })
        .catch(error => {
            dispatch({ type: CHANGE_PASSWORD_POPUP_STATE_ACTIONS.SET_ERROR_MESSAGE, errorMessage: error.response.data.errorMessage });
            setTimeout(() => {
                dispatch({ type: CHANGE_PASSWORD_POPUP_STATE_ACTIONS.SET_ERROR_MESSAGE, errorMessage: null });
            }, 10_000);
        });
    };

    return {
        changePasswordState,
        handleOnFieldChange,
        handleClickSaveButton
    };
}