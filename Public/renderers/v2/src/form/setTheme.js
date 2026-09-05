import defaultClasses from "./classes.json" with { type: "json" };

export const setTheme = ({ inForm, inTheme = "default" } = {}) => {
    const localForm = inForm;
    const localTheme = inTheme || "default";

    if (!localForm) return;

    localForm.theme = localTheme;
    const baseTheme = defaultClasses[localTheme] || defaultClasses["default"] || defaultClasses;
    localForm.classes = { ...baseTheme, ...(localForm.store?.config?.classes || {}) };

    if (localForm.formElement) {
        return localForm.render();
    }
};

export default setTheme;
