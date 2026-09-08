const createActions = ({ inForm } = {}) => {
    const localForm = inForm;

    const localLoad = async ({ inQuery = {} } = {}) => {
        if (!localForm?.dataProvider || typeof localForm.dataProvider.read !== "function") {
            return localForm?.store?.formData || {};
        }
        try {
            const fetchedData = await localForm.dataProvider.read({ inQuery });
            const record = Array.isArray(fetchedData) ? fetchedData[0] : (fetchedData?.data || fetchedData || {});
            localForm.store.updateData({ inData: record });
            localForm.renderStructure();
            return record;
        } catch (error) {
            console.error("[json-to-dom-form:load] Failed to load data via dataProvider:", error);
            return localForm?.store?.formData || {};
        }
    };

    const localUpdate = ({ inData = {} } = {}) => {
        localForm.store.updateData({ inData });
        return localForm.renderStructure();
    };

    const localGetData = () => {
        if (!localForm?.formElement) return {};
        const formData = new FormData(localForm.formElement);
        return Object.fromEntries(formData.entries());
    };

    const localSetData = ({ inData = {} } = {}) => {
        return localUpdate({ inData });
    };

    const localReset = () => {
        if (localForm?.formElement && typeof localForm.formElement.reset === "function") {
            localForm.formElement.reset();
        }
    };

    return {
        load: localLoad,
        update: localUpdate,
        getData: localGetData,
        setData: localSetData,
        reset: localReset
    };
};

export { createActions };
export default createActions;
