import { buildDataList } from "../datalistBuilder/index.js";

const buildSpec = ({ inDataList } = {}) => {
    const localDataList = inDataList;
    if (!localDataList?.store) return null;

    return buildDataList({
        inData: localDataList.store.stateData,
        inColumns: localDataList.store.activeColumns,
        inTopN: localDataList.store.topN
    });
};

export { buildSpec };
export default buildSpec;
