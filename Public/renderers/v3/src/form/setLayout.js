import { resolveClasses } from "./resolveClasses.js";

export const setLayout = ({ inForm, inLayout = "stacked" } = {}) => {
    const localForm = inForm;
    const localLayout = inLayout || "stacked";

    if (!localForm) return;

    localForm.layout = localLayout;
    localForm.classes = resolveClasses({
        inLayout: localForm.layout,
        inTheme: localForm.theme,
        inConfigClasses: localForm.store?.config?.classes,
        inCustomClasses: localForm.customClasses
    });

    if (localForm.formElement) {
        return localForm.render();
    }
};

export default setLayout;
