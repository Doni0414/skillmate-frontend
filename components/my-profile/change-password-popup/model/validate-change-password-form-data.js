export function validateChangePasswordFormData(data) {
    return {
        oldPasswordError: data.oldPassword.trim().length < 6 ? "Old password should contain at least 6 characters" : null,
        newPasswordError: data.newPassword.trim().length < 6 ? "New password should contain at least 6 characters" : null,
        confirmNewPasswordError: data.confirmNewPassword.trim() === "" ? "New password confirmation can't be empty" : null,
        passwordsEquality: data.newPassword !== data.confirmNewPassword ? "New password and confirmation passwords are not equal" : null
    };
}