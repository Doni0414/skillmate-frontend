export function hasErrors(errors) {
    return Object.values(errors).some(x => x !== null);
}