import { DataListStore } from "./datalistStore/index.js";
import { createMethods } from "./methods/index.js";
import { createActions } from "./actions/index.js";
import { groupBy } from "../common/index.js";

class DataList {
    constructor({
        data = [],
        columns = [],
        config = {},
        dataProvider = null,
        targetContainerId = "datalist-container",
        inData,
        inColumns,
        inConfig,
        inDataProvider,
        inTargetContainerId
    } = {}) {
        const localData = inData || data;
        const localColumns = inColumns || columns;
        const localConfig = inConfig || config;
        const localDataProvider = inDataProvider || dataProvider;
        const localTargetContainerId = inTargetContainerId || targetContainerId;

        this.containerId = localTargetContainerId;
        this.dataProvider = localDataProvider;
        this.element = null;
        this.controlsTree = null;

        this.store = new DataListStore({
            inData: localData,
            inColumns: localColumns,
            inConfig: localConfig
        });

        this.methods = createMethods({ inDataList: this });
        this.actions = createActions({ inDataList: this });
        this.spec = this.buildSpec();
    }

    buildSpec() {
        return this.methods.buildSpec();
    }

    renderStructure(args = {}) {
        return this.methods.renderStructure(args);
    }

    async render(args = {}) {
        return await this.methods.render(args);
    }

    async load(args = {}) {
        return await this.actions.load(args);
    }

    update(args = {}) {
        return this.actions.update(args);
    }

    getGroupedData({ inKey = "", inTopN } = {}) {
        const localKey = inKey;
        const localTopN = inTopN ?? this.store.topN ?? 0;

        return groupBy({
            inData: this.store.stateData,
            inKey: localKey,
            inTopN: localTopN
        });
    }

    getControlsTree() {
        return this.controlsTree;
    }

    get data() {
        return this.store.stateData;
    }

    get columns() {
        return this.store.activeColumns;
    }

    get config() {
        return this.store.config;
    }
}

DataList.groupBy = groupBy;
DataList.layouts = [];
DataList.themes = [];

export { DataList };
export default DataList;
