const load = async ({ inDataList, inQuery = {} } = {}) => {
    const localDataList = inDataList;
    const localQuery = inQuery;

    if (!localDataList?.dataProvider || typeof localDataList.dataProvider.read !== "function") {
        return localDataList?.store?.stateData || [];
    }

    try {
        const fetchedData = await localDataList.dataProvider.read({ inQuery: localQuery });
        const records = Array.isArray(fetchedData) ? fetchedData : (fetchedData?.data || []);
        localDataList.store.updateData({ inData: records });
        localDataList.renderStructure();
        return records;
    } catch (error) {
        console.error("[json-to-dom-datalist:load] Failed to load records via dataProvider.read:", error);
        return localDataList?.store?.stateData || [];
    }
};

export { load };
export default load;
