import columns from "./columns.json" with { type: "json" };
import tableConfig from "./table/config.json" with { type: "json" };
import searchConfig from "./search/config.json" with { type: "json" };
import datalistConfig from "./datalist/config.json" with { type: "json" };

// 1. Hook to locally transported renderers (v13 with modular Form, Table, and DataList)
// import { Table, Form, DataList, createDataProvider } from "../../renderers/v14/index.js";
// import { Table, Form, DataList, createDataProvider } from "https://keshavsoft.github.io/json-to-dom-renderers/dist/v14/min.js";
import { Table } from "https://keshavsoft.github.io/json-to-dom-table/dist/v2/min.js";
// import { Table } from "../../renderers/table/v2/index.js";
import { Form } from "https://keshavsoft.github.io/json-to-dom-form/dist/v1/min.js";
import { DataList } from "https://keshavsoft.github.io/json-to-dom-datalist/dist/v2/min.js";
// import { DataList } from "../../renderers/datalist/v2/index.js";
import { createDataProvider } from "https://keshavsoft.github.io/json-to-dom-provider/dist/v1/min.js";

// 2. Data Provider configured with endpoints for autocomplete reading and order insertion
const dataProvider = createDataProvider({
    inReadUrl: "./data.json",
    inCreateUrl: "./data.json"
});

// Helper function to update record count badge following in-local convention
const updateBadge = ({ inBadgeElement, inStateCount, inTotalCount } = {}) => {
    const localBadgeElement = inBadgeElement;
    const localStateCount = inStateCount;
    const localTotalCount = inTotalCount;

    if (!localBadgeElement) return;

    if (localStateCount === localTotalCount) {
        localBadgeElement.className = "badge bg-success";
        localBadgeElement.textContent = `All ${localTotalCount.toLocaleString()} records`;
    } else {
        localBadgeElement.className = "badge bg-warning text-dark";
        localBadgeElement.textContent = `Showing ${localStateCount.toLocaleString()} of ${localTotalCount.toLocaleString()} records`;
    }
};

// Helper function to reset filters and restore original state data in memory (no server fetch)
const resetFilters = ({ inTable, inDataList, inFormElement, inBadgeElement } = {}) => {
    const localTable = inTable;
    const localDataList = inDataList;
    const localFormElement = inFormElement;
    const localBadgeElement = inBadgeElement;

    // 1. Clear form input fields
    if (localFormElement) {
        const inputs = localFormElement.querySelectorAll("input");
        inputs.forEach(input => {
            input.value = "";
        });
    }

    // 2. Reset table to original data in-memory (no server roundtrip)
    if (localTable) {
        localTable.filterOriginalData({ query: {} });
    }

    // 3. Resync datalist options with pristine data
    if (localDataList && localTable?.store?.stateData) {
        localDataList.update({ data: localTable.store.stateData });
    }

    // 4. Update badge display
    if (localBadgeElement && localTable?.store) {
        updateBadge({
            inBadgeElement: localBadgeElement,
            inStateCount: localTable.store.stateData.length,
            inTotalCount: localTable.store.rawData.length
        });
    }

    // 5. If mobile navbar is expanded, collapse it
    const navCollapseElement = document.getElementById("mobileNavCollapse");
    if (navCollapseElement && navCollapseElement.classList.contains("show")) {
        const bsCollapse = window.bootstrap?.Collapse?.getInstance(navCollapseElement);
        if (bsCollapse) {
            bsCollapse.hide();
        }
    }
};

const startFunc = async () => {
    // 2. Instantiate Table with dataProvider (no hardcoded data!)
    const table = new Table({
        theme: "default",
        columns,
        config: tableConfig,
        dataProvider
    });

    const fetchedData = await table.render({ inContainerId: "table-container" });
    console.log("3. render (Full) : ", fetchedData);

    // 3. Instantiate and render Form
    const form = new Form({
        theme: "default",
        columns,
        config: searchConfig,
        targetContainerId: "filter-container"
    });

    const fromForm = form.render();

    // 4. Instantiate and render DataList populated with fetched records
    const dataList = new DataList({
        theme: "default",
        data: table.store.stateData,
        columns,
        config: datalistConfig,
        targetContainerId: "datalist-container"
    });

    await dataList.render();

    const formElement = fromForm?.element;
    const badgeElement = document.getElementById("record-count-badge");

    // Initialize badge with total count
    if (badgeElement && table?.store) {
        updateBadge({
            inBadgeElement: badgeElement,
            inStateCount: table.store.stateData.length,
            inTotalCount: table.store.rawData.length
        });
    }

    // Hook up In-Memory Reset triggers
    const resetTriggers = [
        document.getElementById("nav-reset-btn"),
        document.getElementById("mobile-nav-reset-btn"),
        document.getElementById("header-reset-btn"),
        document.getElementById("card-clear-filters-btn")
    ];

    resetTriggers.forEach(trigger => {
        if (trigger) {
            trigger.addEventListener("click", event => {
                event.preventDefault();
                resetFilters({
                    inTable: table,
                    inDataList: dataList,
                    inFormElement: formElement,
                    inBadgeElement: badgeElement
                });
            });
        }
    });

    // Hook up Full Server Reload trigger
    const reloadServerBtn = document.getElementById("header-reload-btn");
    if (reloadServerBtn) {
        reloadServerBtn.addEventListener("click", () => {
            window.location.reload();
        });
    }

    if (!formElement) {
        console.warn("Form element was not rendered; skipping button listeners.");
        return;
    }

    const buttons = formElement.querySelectorAll("button");

    buttons.forEach(button => {
        button.addEventListener("click", event => {
            const currentTarget = event.currentTarget;
            const closestRow = currentTarget.closest("div");
            const input = closestRow.querySelector("input");
            const name = input.getAttribute("name");
            const value = input.value;
            const query = {};
            query[name] = value;

            table.filterStateData({ query });

            // Update datalist autocomplete options with new filtered state counts
            dataList.update({ data: table.store.stateData });

            // Update badge with filtered counts
            updateBadge({
                inBadgeElement: badgeElement,
                inStateCount: table.store.stateData.length,
                inTotalCount: table.store.rawData.length
            });
        });
    });
};

startFunc();

