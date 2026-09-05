import { FormStore } from "./formStore/index.js";
import { renderForm } from "./renderForm.js";
import { setTheme } from "./setTheme.js";
import { setLayout } from "./setLayout.js";
import { resolveClasses } from "./resolveClasses.js";

export class Form {
    constructor({
        columns = [],
        config = {},
        layout,
        theme,
        classes = {},
        targetContainerId = "form-container"
    } = {}) {
        const localColumns = columns;
        const localConfig = config;
        const localLayout = layout || localConfig?.layout || "stacked";
        const localTheme = theme || localConfig?.theme || "default";
        const localClasses = classes;
        const localTargetContainerId = targetContainerId;

        this.containerId = localTargetContainerId;
        this.layout = localLayout;
        this.theme = localTheme;
        this.customClasses = localClasses;
        this.classes = resolveClasses({
            inLayout: this.layout,
            inTheme: this.theme,
            inConfigClasses: localConfig?.classes,
            inCustomClasses: this.customClasses
        });
        this.formElement = null;
        this.controlsTree = null;

        this.store = new FormStore({
            inColumns: localColumns,
            inConfig: localConfig
        });
    }

    setLayout({ inLayout, layout = "stacked" } = {}) {
        const localLayout = inLayout || layout || "stacked";
        return setLayout({ inForm: this, inLayout: localLayout });
    }

    setTheme({ inTheme, theme = "default" } = {}) {
        const localTheme = inTheme || theme || "default";
        return setTheme({ inForm: this, inTheme: localTheme });
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
