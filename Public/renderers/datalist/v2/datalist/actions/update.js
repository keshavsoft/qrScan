const update = ({ inDataList, inData = [] } = {}) => {
    const localDataList = inDataList;
    const localData = inData;

    localDataList.store.updateData({ inData: localData });
    return localDataList.renderStructure();
};

export { update };
export default update;
