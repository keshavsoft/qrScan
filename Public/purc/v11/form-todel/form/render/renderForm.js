import { buildForm } from "../formBuilder/index.js";
import { pruneTreeWithIds } from "../../common/pruneTreeWithIds.js";

const renderForm = ({ inForm, inContainerId, inContainer } = {}) => {
    const localForm = inForm;
    const localContainerId = inContainerId;
    const localContainer = inContainer;

    if (!localForm) {
        console.error("[json-to-dom-renderers:Form] Form instance (inForm) is required to render.");
        return {
            treeWithIds: null,
            spec: null,
            element: null,
            error: "Form instance (inForm) is required"
        };
    }

    const formSpec = buildForm({
        inColumns: localForm.store.activeColumns,
        inConfig: localForm.store.config,
        inClasses: localForm.classes
    });

    const controlsTree = pruneTreeWithIds({ inSpec: formSpec });

    const builder = window.ks?.["json-to-dom"]?.buildSpecElement;
    if (typeof builder !== "function") {
        console.error("json-to-dom buildSpecElement not found on window.ks");
        return {
            treeWithIds: controlsTree,
            spec: formSpec,
            element: null
        };
    }

    const domElement = builder({ inSpec: formSpec });
    const formElement = Array.isArray(domElement) ? domElement[0] : domElement;

    // Resolve target container if provided
    let container = null;
    if (localContainer instanceof HTMLElement) {
        container = localContainer;
    } else {
        const targetId = localContainerId || localForm.containerId;
        if (targetId) {
            container = document.getElementById(targetId);
        }
    }

    if (container) {
        container.innerHTML = "";
        container.appendChild(formElement);
    }

    localForm.formElement = formElement;
    localForm.controlsTree = controlsTree;

    return {
        treeWithIds: controlsTree,
        spec: formSpec,
        element: formElement,
        store: localForm.store
    };
};

export { renderForm };
export default renderForm;
