import Router from "next/router";
import { useEffect, useRef, useState } from "react";
import apiClient from "../api-client";

export function useFormState() {

    // auth form header state
    const [ signupToggled, setSignupToggled ] = useState(false);
    const signinToggled = !signupToggled;

    // login data state
    const [loginFormData, setLoginFormData] = useState({
        email: "",
        password: "",
    });

    const [loginFieldErrors, setLoginFieldErrors] = useState({
        emailErrorMessage: null,
        passwordErrorMessage: null
    });

    // signup data state
    const [signupFormData, setSignupFormData] = useState({
        email: "",
        fullName: "",
        country: "",
        password: "",
        confirmPassword: "",
    });

    const [signupFieldErrors, setSignupFieldErrors] = useState({
        emailErrorMessage: null,
        fullNameErrorMessage: null,
        countryErrorMessage: null,
        passwordErrorMessage: null  
    });

    // verification state
    const [isVerificationOpen, setIsVerificationOpen] = useState(false);

    const [verificationDigits, setVerificationDigits] = useState(["", "", "", ""]);
    const inputsRef = useRef([]);

    const [verificationErrorMessage, setVerificationErrorMessage] = useState(null);

    // auth form header handlers
    const toggleSignup = (isSignupButton) => {
        if (isSignupButton) {
            setSignupToggled(true);
        } else {
            setSignupToggled(false);
        }
    };


    // login handlers
    const handleLoginFieldChange = (field, value) => {
        setLoginFormData(lastLoginFormData => ({ ...lastLoginFormData, [field]: value }));
    };

    const handleLogin = async (event) => {
        event.preventDefault();

        apiClient.post("/users/auth/login", loginFormData, { 
           headers: {
            "Content-Type": "application/json",
           }
        }).then(response => {
            console.log(response);
            Router.push("/my-profile")
        }).catch(error => {
            console.log(error)
            const errorMessages = error.response.data;

            setLoginFieldErrors({
                emailErrorMessage: errorMessages.email,
                passwordErrorMessage: errorMessages.password || errorMessages.errorMessage
            });
        });
    }

    // signup handlers
    const handleSignupFieldChange = (field, value) => {
        setSignupFormData((lastSignupFormData) => ({ ...lastSignupFormData, [field]: value }));
        console.log(signupFormData)
      };
    
      const handleSignup = async (event) => {
        event.preventDefault();
    
        if (signupFormData.password !== signupFormData.confirmPassword) {
          setSignupFieldErrors(lastSignupFieldErrors => ({
            ...lastSignupFieldErrors,
            passwordErrorMessage: "Passwords do not match"
          }));
          return;
        }

        apiClient.post("/users/auth/register", signupFormData, {
            headers: {
                "Content-Type": "application/json"
            },
        }).then(response => {
            setIsVerificationOpen(true);
        }).catch(error => {
            console.log(error);
            const errorMessages = error.response.data;

            setSignupFieldErrors(lastSignupFieldErrors => {
                const newSignupFieldErrors = {
                    "emailErrorMessage": errorMessages.email,
                    "fullNameErrorMessage": errorMessages.fullName,
                    "countryErrorMessage": errorMessages.country,
                    "passwordErrorMessage": errorMessages.password
                }; 
                console.log("Signup field errors", newSignupFieldErrors)
                return newSignupFieldErrors;
        });

        })
    }

    const closeVerification = () => {
        setIsVerificationOpen(false);
    }

    const handleDoNotHaveAccountClick = (e) => {
        e.preventDefault();
        toggleSignup(true);
    };

    // verification handlers
    const handleVerificationDigitInput = (index, event) => {
        const { value } = event.target;
    
        if (!/^\d?$/.test(value)) return; // Только цифры
        if (index > 0 && verificationDigits[index - 1] === "") return;

        setVerificationDigits(lastDigits => verificationDigits.map((digit, i) => i === index ? value : digit));

        // Перемещение к следующему полю, если введена цифра
        if (value && index < 3) {
            inputsRef.current[index + 1].focus();
        }
    };
    
    const handleVerificationKeyDown = (index, event) => {
    if (event.key === "Backspace" && !verificationDigits[index] && index > 0) {
        // Перемещение назад при удалении
        inputsRef.current[index - 1].focus();
    }
    };
  
    const handleSendCodeVerificationClick = async (event, email) => {
        event.preventDefault();
        if (verificationDigits.filter((digit) => digit.length === 1).length === 4) {
            const code = verificationDigits.join("")

            apiClient.post("/users/auth/confirm-email", {
                email: email,
                code: code
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(response => {
                Router.push("/");
                // closeVerification();
            }).catch(error => {
                setVerificationErrorMessage(error.response.data.errorMessage);
            });
        }
    }

    const handleResendCodeClick = async (email) => {
        apiClient.post("/users/auth/resend-code", null, {
            params: {
                email
            }
        }).then(response => {

        }).catch(error => {
            console.log("Error while resending verification code", error);
        });
    }
    
    const selectCountry = (selectedOption) => {
        setSignupFormData(lastSignupFormData => (
            {
                ...lastSignupFormData,
                country: selectedOption
            }
        ))
    }
    
    return {
        signupToggled, 
        signinToggled,
        signupFormData,
        signupFieldErrors,
        selectCountry,
        loginFieldErrors,
        isVerificationOpen, 
        verificationDigits,
        inputsRef,
        verificationErrorMessage,
        toggleSignup, 
        handleLoginFieldChange, 
        handleLogin, 
        handleDoNotHaveAccountClick,
        handleSignup,
        handleSignupFieldChange,
        handleVerificationDigitInput,
        handleVerificationKeyDown,
        handleSendCodeVerificationClick,
        handleResendCodeClick,
        closeVerification
    };
}
