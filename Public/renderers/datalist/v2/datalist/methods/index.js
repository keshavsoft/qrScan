import { buildSpec } from "./buildSpec.js";
import { renderStructure } from "./renderStructure.js";
import { renderDataList } from "./renderDataList.js";

const methods = {
    buildSpec,
    renderStructure,
    renderDataList
};

const createMethods = ({ inDataList } = {}) => {
    const localDataList = inDataList;

    const localBuildSpec = () => {
        return buildSpec({ inDataList: localDataList });
    };

    const localRenderStructure = ({ inContainerId, inContainer, targetContainerId } = {}) => {
        const result = renderStructure({
            inDataList: localDataList,
            inContainerId,
            inContainer,
            targetContainerId
        });
        if (result?.element) {
            localDataList.element = result.element;
            localDataList.controlsTree = result.treeWithIds;
        }
        return result;
    };

    const localRender = async ({ inContainerId, inContainer, targetContainerId } = {}) => {
        const result = await renderDataList({
            inDataList: localDataList,
            inContainerId,
            inContainer,
            targetContainerId
        });
        if (result?.element) {
            localDataList.element = result.element;
            localDataList.controlsTree = result.treeWithIds;
        }
        return result;
    };

    return {
        buildSpec: localBuildSpec,
        renderStructure: localRenderStructure,
        render: localRender
    };
};

export { methods, createMethods, buildSpec, renderStructure, renderDataList };
export default methods;
