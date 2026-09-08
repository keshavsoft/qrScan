// 1. Resolve Control Alignment ("stacked" | "horizontal")
const getAlignment = ({ inConfig }) => {
    const localConfig = inConfig;

    return localConfig?.control?.alignment ||
        localConfig?.alignment ||
        (localConfig?.layout === "horizontal" ? "horizontal" : "stacked");
};

// 2. Build Label Element Spec
const buildLabel = ({ inColumn, inClasses, inAlignment }) => {
    const localColumn = inColumn;
    const localClasses = inClasses;
    const localAlignment = inAlignment;

    const key = localColumn.key || "";
    const labelText = localColumn.label || key;

    const labelClass = localAlignment === "horizontal"
        ? (localClasses?.label || "col-sm-4 col-form-label text-sm-end mb-0")
        : (localClasses?.label || "form-label mb-1");

    const labelNode = {
        tagName: "label",
        textContent: labelText,
        attributes: labelClass ? { class: labelClass } : {}
    };

    if (localColumn.id) {
        labelNode.attributes.for = localColumn.id;
    }

    return labelNode;
};

// 3. Build Input Element Spec
const buildInput = ({ inColumn, inClasses }) => {
    const localColumn = inColumn;
    const localClasses = inClasses;

    const key = localColumn.key || "";
    const labelText = localColumn.label || key;
    const inputType = localColumn.type === "number" ? "number" : "text";

    const hasDatalist = localColumn.datalist === true || (localColumn.datalist !== false && inputType !== "number");
    const datalistId = localColumn.datalistId || `${key}-datalist`;

    const inputAttributes = {
        type: inputType,
        name: key,
        placeholder: `Enter ${labelText}...`
    };

    if (localClasses?.input) {
        inputAttributes.class = localClasses.input;
    }

    if (hasDatalist) {
        inputAttributes.list = datalistId;
    }

    if (localColumn.id) {
        inputAttributes.id = localColumn.id;
    }

    return {
        tagName: "input",
        attributes: inputAttributes
    };
};

// 4. Build Control Node (with optional Search button and wrapper)
const buildControl = ({ inColumn, inClasses, inConfig, inInputNode }) => {
    const localColumn = inColumn;
    const localClasses = inClasses;
    const localConfig = inConfig;
    const localInputNode = inInputNode;

    const key = localColumn.key || "";

    const isSearchDisabled = localConfig?.control?.searchButtons === false ||
        localConfig?.searchButtons === false ||
        localColumn.searchButton === false ||
        localColumn.search === false;
    const isSearchExplicit = localConfig?.control?.searchButtons === true ||
        localConfig?.searchButtons === true ||
        localColumn.searchButton === true ||
        localColumn.search === true;
    const hasSearchButton = !isSearchDisabled && (isSearchExplicit || Boolean(localColumn.searchId));

    let controlNode = localInputNode;

    if (hasSearchButton) {
        const searchButtonNode = {
            tagName: "button",
            textContent: "Search",
            attributes: {
                "data-highlight": "true",
                "data-highlight-class": "bg-primary bg-opacity-10 rounded border border-primary border-opacity-25",
                "data-closest-target": "ksrow",
                type: "button",
                id: localColumn.searchId || `${key}-search`,
                name: `${key}-search`,
                "data-key": key,
                class: localClasses?.button || "btn btn-outline-secondary"
            }
        };

        controlNode = {
            tagName: "div",
            attributes: localClasses?.group ? { class: localClasses.group } : {},
            children: [localInputNode, searchButtonNode]
        };
    }

    if (localClasses?.controlWrapper) {
        controlNode = {
            tagName: "div",
            attributes: { class: localClasses.controlWrapper },
            children: [controlNode]
        };
    }

    return controlNode;
};

// 5. Resolve Grid / Column Classes
const resolveFieldClass = ({ inColumn, inClasses, inConfig }) => {
    const localColumn = inColumn;
    const localClasses = inClasses;
    const localConfig = inConfig;

    let defaultColClass = "";
    if (localConfig?.grid) {
        const gridCols = typeof localConfig.grid === "object"
            ? (localConfig.grid.columns || localConfig.grid.cols)
            : localConfig.grid;
        if (gridCols === 1) defaultColClass = "col-12";
        else if (gridCols === 2) defaultColClass = "col-md-6";
        else if (gridCols === 3) defaultColClass = "col-md-4";
        else if (gridCols === 4) defaultColClass = "col-md-3";
    }

    return localColumn.colClass || localColumn.class || defaultColClass || localClasses?.field || "";
};

// 6. Wrap Field according to Layout Alignment
const wrapFieldLayout = ({ inAlignment, inLabelNode, inControlNode, inFieldClass, inClasses }) => {
    const localAlignment = inAlignment;
    const localLabelNode = inLabelNode;
    const localControlNode = inControlNode;
    const localFieldClass = inFieldClass;
    const localClasses = inClasses;

    if (localAlignment === "horizontal") {
        const controlWrapperNode = localClasses?.controlWrapper
            ? localControlNode
            : {
                tagName: "div",
                attributes: { class: "col-sm-8" },
                children: [localControlNode]
            };

        const innerRow = {
            tagName: "div",
            attributes: {
                class: "row align-items-center g-2 ksrow"
            },
            children: [localLabelNode, controlWrapperNode]
        };

        return {
            tagName: "div",
            attributes: localFieldClass ? { class: localFieldClass } : {},
            children: [innerRow]
        };
    }

    return {
        tagName: "div",
        attributes: localFieldClass ? { class: localFieldClass } : {},
        children: [localLabelNode, localControlNode]
    };
};

// Main Field Orchestrator
const buildField = ({ inColumn = {}, inClasses = {}, inConfig = {} } = {}) => {
    const localColumn = inColumn;
    const localClasses = inClasses;
    const localConfig = inConfig;

    // 1. Determine Control Alignment: "stacked" | "horizontal"
    const alignment = getAlignment({ inConfig: localConfig });

    // 2. Build Label Element Spec
    const labelNode = buildLabel({
        inColumn: localColumn,
        inClasses: localClasses,
        inAlignment: alignment
    });

    // 3. Build Input Element Spec
    const inputNode = buildInput({
        inColumn: localColumn,
        inClasses: localClasses
    });

    // 4. Build Control Spec (Input + Search Button / Group / Wrapper)
    const controlNode = buildControl({
        inColumn: localColumn,
        inClasses: localClasses,
        inConfig: localConfig,
        inInputNode: inputNode
    });

    // 5. Determine Grid Column Class
    const fieldClass = resolveFieldClass({
        inColumn: localColumn,
        inClasses: localClasses,
        inConfig: localConfig
    });

    // 6. Wrap according to alignment
    return wrapFieldLayout({
        inAlignment: alignment,
        inLabelNode: labelNode,
        inControlNode: controlNode,
        inFieldClass: fieldClass,
        inClasses: localClasses
    });
};

export { buildField };
export default buildField;
