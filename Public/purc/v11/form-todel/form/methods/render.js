import { renderStructure } from "./renderStructure.js";

const render = async ({ inForm, inContainerId, inContainer, targetContainerId } = {}) => {
    const localForm = inForm;
    const localContainerId = inContainerId || targetContainerId;
    const localContainer = inContainer;

    if (localForm?.dataProvider && (!localForm.store.formData || Object.keys(localForm.store.formData).length === 0)) {
        await localForm.actions.load();
    }

    return renderStructure({
        inForm: localForm,
        inContainerId: localContainerId,
        inContainer: localContainer
    });
};

export { render };
export default render;
