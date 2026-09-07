import { renderStructure } from "./renderStructure.js";

const renderDataList = async ({ inDataList, inContainerId, inContainer, targetContainerId } = {}) => {
    const localDataList = inDataList;
    const localContainerId = inContainerId || targetContainerId;
    const localContainer = inContainer;

    if (localDataList?.dataProvider && (!localDataList.store.stateData || localDataList.store.stateData.length === 0)) {
        await localDataList.actions.load();
    }

    return renderStructure({
        inDataList: localDataList,
        inContainerId: localContainerId,
        inContainer: localContainer
    });
};

export { renderDataList };
export default renderDataList;
