import columns from "./columns.json" with { type: "json" };
import tableConfig from "./table/config.json" with { type: "json" };
import searchConfig from "./search/config.json" with { type: "json" };
import datalistConfig from "./datalist/config.json" with { type: "json" };

// 1. Renderers pulled via GitHub Pages docs/dist bundles
import { Table } from "https://keshavsoft.github.io/json-to-dom-table/dist/v2/min.js";
import { Form } from "https://keshavsoft.github.io/json-to-dom-form/dist/v1/min.js";
import { DataList } from "https://keshavsoft.github.io/json-to-dom-datalist/dist/v2/min.js";
import { createDataProvider } from "https://keshavsoft.github.io/json-to-dom-provider/dist/v1/min.js";
import { Menu } from "https://keshavsoft.github.io/json-to-dom-menu/dist/v1/min.js";

// 2. Data Provider configured with endpoints for autocomplete reading and order insertion
const dataProvider = createDataProvider({
    inReadUrl: "./data.json",
    inCreateUrl: "./data.json"
});

// Helper function to update record count badge following in-local convention
const updateBadge = ({ inMenu, inStateCount, inTotalCount } = {}) => {
    const localMenu = inMenu;
    const localStateCount = inStateCount;
    const localTotalCount = inTotalCount;

    if (!localMenu) return;

    if (localStateCount === localTotalCount) {
        localMenu.setBadge({
            inText: `All ${localTotalCount.toLocaleString()} records`,
            inType: "success"
        });
    } else {
        localMenu.setBadge({
            inText: `Showing ${localStateCount.toLocaleString()} of ${localTotalCount.toLocaleString()} records`,
            inType: "warning"
        });
    }
};

// Helper function to reset filters and restore original state data in memory (no server fetch)
const resetFilters = ({ inTable, inDataList, inFormElement, inMenu } = {}) => {
    const localTable = inTable;
    const localDataList = inDataList;
    const localFormElement = inFormElement;
    const localMenu = inMenu;

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
    if (localMenu && localTable?.store) {
        updateBadge({
            inMenu: localMenu,
            inStateCount: localTable.store.stateData.length,
            inTotalCount: localTable.store.rawData.length
        });
    }

    // 5. Collapse mobile navbar drawer if open
    if (localMenu) {
        localMenu.collapseMobile();
    }
};

const startFunc = async () => {
    let table = null;
    let dataList = null;
    let formElement = null;

    // 3. Instantiate and render Dynamic Menu via json-to-dom-menu
    const menuItems = [
        { id: "home", label: "Home", icon: "bi-house", href: "#" },
        { id: "dashboard", label: "Dashboard", icon: "bi-speedometer2", href: "#" },
        { id: "orders", label: "Orders", icon: "bi-table", active: true },
        { id: "products", label: "Products", icon: "bi-grid", href: "#" },
        { id: "customers", label: "Customers", icon: "bi-people", href: "#" },
        { id: "reset", label: "Reset", icon: "bi-arrow-clockwise", class: "text-info", isAction: true, title: "Instantly reset filtered data without reloading page" }
    ];

    const menu = new Menu({
        targetContainerId: "header-container",
        brand: {
            title: "Purchases",
            subtitle: "Hybrid Search & Table (v8)",
            iconText: "B",
            href: "./"
        },
        items: menuItems,
        subHeader: {
            status: {
                id: "record-count-badge",
                label: "Status:",
                badgeText: "Loading records...",
                badgeClass: "badge bg-secondary"
            },
            actions: [
                { id: "header-reset-btn", label: "Reset Filters", icon: "bi-arrow-clockwise", class: "btn btn-sm btn-primary" },
                { id: "header-reload-btn", label: "Reload Server", icon: "bi-cloud-arrow-down", class: "btn btn-sm btn-outline-secondary", title: "Full refresh from server" }
            ]
        },
        onItemClick: ({ inItem, inEvent }) => {
            if (inItem?.id === "reset") {
                inEvent?.preventDefault();
                resetFilters({
                    inTable: table,
                    inDataList: dataList,
                    inFormElement: formElement,
                    inMenu: menu
                });
            }
        },
        onActionClick: ({ inAction, inEvent }) => {
            if (inAction?.id === "header-reset-btn") {
                resetFilters({
                    inTable: table,
                    inDataList: dataList,
                    inFormElement: formElement,
                    inMenu: menu
                });
            } else if (inAction?.id === "header-reload-btn") {
                window.location.reload();
            }
        }
    });

    menu.render();

    // 4. Instantiate Table with dataProvider
    table = new Table({
        theme: "default",
        columns,
        config: tableConfig,
        dataProvider
    });

    const fetchedData = await table.render({ inContainerId: "table-container" });
    console.log("3. render (Full) : ", fetchedData);

    // 5. Instantiate and render Form
    const form = new Form({
        theme: "default",
        columns,
        config: searchConfig,
        targetContainerId: "filter-container"
    });

    const fromForm = form.render();
    formElement = fromForm?.element;

    // 6. Instantiate and render DataList populated with fetched records
    dataList = new DataList({
        theme: "default",
        data: table.store.stateData,
        columns,
        config: datalistConfig,
        targetContainerId: "datalist-container"
    });

    await dataList.render();

    // Initialize badge with total records count
    if (table?.store) {
        updateBadge({
            inMenu: menu,
            inStateCount: table.store.stateData.length,
            inTotalCount: table.store.rawData.length
        });
    }

    // Hook up Card Filter Clear Button
    const cardClearBtn = document.getElementById("card-clear-filters-btn");
    if (cardClearBtn) {
        cardClearBtn.addEventListener("click", () => {
            resetFilters({
                inTable: table,
                inDataList: dataList,
                inFormElement: formElement,
                inMenu: menu
            });
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
                inMenu: menu,
                inStateCount: table.store.stateData.length,
                inTotalCount: table.store.rawData.length
            });
        });
    });
};

startFunc();
