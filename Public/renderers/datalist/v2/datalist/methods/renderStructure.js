import { pruneTreeWithIds } from "../../common/index.js";

const renderNode = ({ inSpec } = {}) => {
    const localSpec = inSpec;
    if (!localSpec || typeof localSpec !== "object") return null;

    const element = document.createElement(localSpec.tagName || "div");

    if (localSpec.attributes && typeof localSpec.attributes === "object") {
        for (const [key, value] of Object.entries(localSpec.attributes)) {
            if (value !== undefined && value !== null) {
                element.setAttribute(key, String(value));
            }
        }
    }

    if (localSpec.textContent !== undefined && localSpec.textContent !== null) {
        element.textContent = localSpec.textContent;
    }

    if (Array.isArray(localSpec.children)) {
        for (const childSpec of localSpec.children) {
            const childElement = renderNode({ inSpec: childSpec });
            if (childElement) {
                element.appendChild(childElement);
            }
        }
    }

    return element;
};

// Story Step 1: Resolve and validate target mount container
const resolveContainer = ({ inDataList, inContainerId, inContainer, targetContainerId } = {}) => {
    const localDataList = inDataList;
    const localContainer = inContainer;
    const localContainerId = inContainerId || targetContainerId || localDataList?.containerId;

    if (localContainer instanceof HTMLElement) {
        return localContainer;
    }

    if (localContainerId && typeof document !== "undefined") {
        return document.getElementById(localContainerId);
    }

    return null;
};

// Story Step 2: Clear and mount DOM element safely to container
const mountToContainer = ({ inContainer, inElement } = {}) => {
    const localContainer = inContainer;
    const localElement = inElement;

    if (!localContainer || !localElement) return;

    localContainer.innerHTML = "";
    localContainer.appendChild(localElement);
};

// Main Orchestration Story
const renderStructure = ({ inDataList, inContainerId, inContainer, targetContainerId } = {}) => {
    const localDataList = inDataList;
    const localContainerId = inContainerId;
    const localContainer = inContainer;
    const localTargetContainerId = targetContainerId;

    // 1. Resolve target container
    const container = resolveContainer({
        inDataList: localDataList,
        inContainerId: localContainerId,
        inContainer: localContainer,
        targetContainerId: localTargetContainerId
    });

    if (!container) {
        if (localDataList?.config?.debug) {
            console.warn(`[json-to-dom-datalist:renderStructure] Target container "${localContainerId || localTargetContainerId || localDataList?.containerId}" not found.`);
        }
        return { element: null, treeWithIds: null, spec: null, error: "Container not found" };
    }

    // 2. Build JSON DOM specification and extract control tree
    const rawSpec = localDataList.buildSpec();
    const treeWithIds = pruneTreeWithIds({ inSpec: rawSpec });

    // 3. Render DOM element from spec and mount to container
    const element = renderNode({ inSpec: rawSpec });
    mountToContainer({ inContainer: container, inElement: element });

    localDataList.element = element;
    localDataList.controlsTree = treeWithIds;

    // 4. Return execution result
    return {
        element,
        treeWithIds,
        spec: rawSpec
    };
};

export { renderStructure, renderNode, resolveContainer, mountToContainer };
export default renderStructure;
