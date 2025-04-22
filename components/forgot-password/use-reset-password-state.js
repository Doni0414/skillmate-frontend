import { useState } from "react";
import { resetPassword } from "../api";
import Router from "next/router";

function formHasErrors(form) {
    return form.newPassword.trim() === "" || 
    form.confirmNewPassword.trim() === "" ||
    form.newPassword !== form.confirmNewPassword ||
    form.newPassword.trim().length < 6
}

export function useResetPasswordState(token) {
    const [form, setForm] = useState({
        newPassword: "",
        confirmNewPassword: ""
    });
    const [errors, setErrors] = useState({});
    const [successMessageText, setSuccessMessageText] = useState(null);
    const [errorMessageText, setErrorMessageText] = useState(null);

    const handleOnFieldChange = (fieldName, fieldValue) => {
        setForm((lastForm) => ({
            ...lastForm,
            [fieldName]: fieldValue
        }))
    }

    const handleNewPasswordFieldChange = (e) => {
        handleOnFieldChange("newPassword", e.target.value);
    }

    const handleConfirmNewPasswordFieldChange = (e) => {
        handleOnFieldChange("confirmNewPassword", e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formHasErrors(form)) {
            if (form.newPassword.trim() === "") {
                setErrors((lastErrors) => ({
                    ...lastErrors,
                    newPasswordError: "New password can't be empty"
                }));
            } else {
                setErrors((lastErrors) => ({
                    ...lastErrors,
                    newPasswordError: null
                }));
            }
            if (form.confirmNewPassword.trim() === "") {
                setErrors((lastErrors) => ({
                    ...lastErrors,
                    confirmNewPasswordError: "Password confirmation can't be empty"
                }));
            } else {
                setErrors((lastErrors) => ({
                    ...lastErrors,
                    confirmNewPasswordError: null
                }));
            }
            if (form.newPassword !== form.confirmNewPassword) {
                setErrorMessageText("Passwords are not equal");
                setTimeout(() => {
                    setErrorMessageText(null);
                }, 10_000);
            }
            if (form.newPassword.trim().length < 6) {
                setErrorMessageText("Password should contain at least 6 characters");
                setTimeout(() => {
                    setErrorMessageText(null);
                }, 10_000);
            }
            return;
        }

        resetPassword(token, form.newPassword)
        .then(response => {
            setSuccessMessageText("The password has been successfull changed");
            setTimeout(() => {
                Router.push("/auth?authType=signin");
            }, 2_000);
        })
        .catch(error => {
            setErrorMessageText(error.response.data.errorMessage);
                setTimeout(() => {
                    setErrorMessageText(null);
                }, 10_000);
        });
    }

    return {
        form,
        handleSubmit, 
        handleNewPasswordFieldChange,
        handleConfirmNewPasswordFieldChange,
        successMessageText, 
        errors,
        errorMessageText
    }
}