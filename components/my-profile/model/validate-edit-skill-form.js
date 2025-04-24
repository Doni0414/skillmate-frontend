export function validateEditSkillForm(form) {
    return {
        skillNameError: form.name.trim() === "" ? "Skill name can't be empty" : null,
        skillDescriptionError: form.description.trim() === "" ? "Skill description can't be empty" : null
    }
}