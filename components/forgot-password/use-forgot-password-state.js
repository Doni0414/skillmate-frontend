import { useState } from "react";
import { forgotPassword } from "../api";

export function useForgotPasswordState() {
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState({});
    const [successMessageText, setSuccessMessageText] = useState(null);
    const [errorMessageText, setErrorMessageText] = useState(null); 

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (email.trim() === "") {
            setErrors((lastErrors) => ({
                ...lastErrors,
                emailError: "Email is required"
            }))
            return;
        }
        forgotPassword(email)
        .then(response => {
            setSuccessMessageText(`Reset password link was sent to ${email}`);
            setTimeout(() => {
                setSuccessMessageText(null);
            }, 5_000);
        }).catch(error => {
            setErrorMessageText("Email is not found");
            setTimeout(() => {
                setErrorMessageText(null);
            }, 5_000);
        });

    }

    return {
        email, 
        handleEmailChange, 
        errors, 
        onSubmit,
        successMessageText,
        errorMessageText
    }
}