import { buildSpec } from "./buildSpec.js";
import { renderStructure } from "./renderStructure.js";
import { render } from "./render.js";

const methods = {
    buildSpec,
    renderStructure,
    render
};

const createMethods = ({ inForm } = {}) => {
    const localForm = inForm;

    const localBuildSpec = () => {
        return buildSpec({ inForm: localForm });
    };

    const localRenderStructure = ({ inContainerId, inContainer, targetContainerId } = {}) => {
        const result = renderStructure({
            inForm: localForm,
            inContainerId,
            inContainer,
            targetContainerId
        });
        if (result?.element) {
            localForm.formElement = result.element;
            localForm.controlsTree = result.treeWithIds;
        }
        return result;
    };

    const localRender = async ({ inContainerId, inContainer, targetContainerId } = {}) => {
        const result = await render({
            inForm: localForm,
            inContainerId,
            inContainer,
            targetContainerId
        });
        if (result?.element) {
            localForm.formElement = result.element;
            localForm.controlsTree = result.treeWithIds;
        }
        return result;
    };

    return {
        buildSpec: localBuildSpec,
        renderStructure: localRenderStructure,
        render: localRender
    };
};

export { methods, createMethods, buildSpec, renderStructure, render };
export default methods;
