import { renderForm } from "../render/index.js";

const renderStructure = ({ inForm, inContainerId, inContainer, targetContainerId } = {}) => {
    const localForm = inForm;
    const localContainerId = inContainerId || targetContainerId;
    const localContainer = inContainer;

    const result = renderForm({
        inForm: localForm,
        inContainerId: localContainerId,
        inContainer: localContainer
    });

    if (result?.element) {
        localForm.formElement = result.element;
        localForm.controlsTree = result.treeWithIds;
    }

    return result;
};

export { renderStructure };
export default renderStructure;
