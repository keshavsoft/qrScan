import { load } from "./load.js";
import { update } from "./update.js";

const actions = { load, update };

const createActions = ({ inDataList } = {}) => {
    const localDataList = inDataList;

    const localLoad = async ({ inQuery, query } = {}) => {
        const localQuery = inQuery ?? query ?? {};
        return await load({ inDataList: localDataList, inQuery: localQuery });
    };

    const localUpdate = ({ inData, data } = {}) => {
        const localData = inData ?? data ?? [];
        return update({ inDataList: localDataList, inData: localData });
    };

    return {
        load: localLoad,
        update: localUpdate
    };
};

export { actions, createActions, load, update };
export default actions;
