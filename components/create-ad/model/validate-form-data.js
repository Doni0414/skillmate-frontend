export function validateFormData(formData) {
    return {
        skillNameError: formData.skillName.trim() === "" ? "Skill name can't be empty" : null,
        skillDescriptionError: formData.description.trim() === "" ? "Skill description can't be empty" : null
    }
}