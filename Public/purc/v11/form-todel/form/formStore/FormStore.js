import { SourceStore } from "../../common/SourceStore.js";

class FormStore extends SourceStore {
    constructor({ inColumns = [], inConfig = {}, inData = {} } = {}) {
        const localColumns = inColumns;
        const localConfig = inConfig;
        const localData = inData;

        super({
            inColumns: localColumns,
            inConfig: localConfig
        });

        this.library = this._buildLibrary({
            inSource: this.source,
            inData: localData
        });
    }

    _buildLibrary({ inSource, inData = {} } = {}) {
        const localSource = inSource;
        const localData = inData;

        const activeColumns = this._resolveActiveColumns({
            inColumnsCatalog: localSource?.columns,
            inColumnKeys: localSource?.config?.body?.columns
        });

        return {
            activeColumns,
            formData: (localData && typeof localData === "object") ? localData : {}
        };
    }

    get activeColumns() {
        return this.library.activeColumns;
    }

    get formData() {
        return this.library.formData || {};
    }

    updateData({ inData = {} } = {}) {
        const localData = inData;
        this.library.formData = (localData && typeof localData === "object") ? localData : {};
        return this.library.formData;
    }
}

export { FormStore };
export default FormStore;
