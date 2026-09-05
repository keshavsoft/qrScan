import { FormStore } from "./formStore/index.js";
import { renderForm } from "./renderForm.js";
import { setTheme } from "./setTheme.js";
import defaultClasses from "./classes.json" with { type: "json" };

export class Form {
    constructor({ columns = [], config = {}, theme = "default", classes = {}, targetContainerId = "form-container" } = {}) {
        const localColumns = columns;
        const localConfig = config;
        const localTheme = theme || localConfig?.theme || "default";
        const baseTheme = defaultClasses[localTheme] || defaultClasses["default"] || defaultClasses;

        this.containerId = targetContainerId;
        this.theme = localTheme;
        this.classes = { ...baseTheme, ...(localConfig?.classes || {}), ...classes };
        this.formElement = null;
        this.controlsTree = null;

        this.store = new FormStore({
            inColumns: localColumns,
            inConfig: localConfig
        });
    }

    setTheme({ theme = "default" } = {}) {
        return setTheme({ inForm: this, inTheme: theme });
    }

    get columns() {
        return this.store.activeColumns;
    }

    get config() {
        return this.store.config;
    }

    render() {
        const result = renderForm({ inForm: this });
        if (result) {
            this.formElement = result.element;
            this.controlsTree = result.treeWithIds;
        }
        return result;
    }

    getControlsTree() {
        return this.controlsTree;
    }
}

export default Form;
