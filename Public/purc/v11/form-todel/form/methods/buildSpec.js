import { buildForm } from "../formBuilder/index.js";

const buildSpec = ({ inForm } = {}) => {
    const localForm = inForm;
    if (!localForm?.store) return null;

    return buildForm({
        inColumns: localForm.store.activeColumns,
        inConfig: localForm.store.config,
        inClasses: localForm.classes
    });
};

export { buildSpec };
export default buildSpec;
