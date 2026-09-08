import columns from "./columns.json" with { type: "json" };
import searchConfig from "./search/config.json" with { type: "json" };
import datalistConfig from "./datalist/config.json" with { type: "json" };
import menuConfig from "./menu/config.json" with { type: "json" };

// 1. Renderers pulled via local distribution / packages
import { Form } from "/renderers/form/v4/min.js";
import { DataList } from "https://keshavsoft.github.io/json-to-dom-datalist/dist/v2/min.js";
import { createDataProvider } from "https://keshavsoft.github.io/json-to-dom-provider/dist/v1/min.js";
import { Menu } from "/renderers/menu/v2/min.js";

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
            inText: `Matching ${localStateCount.toLocaleString()} of ${localTotalCount.toLocaleString()} records`,
            inType: "warning"
        });
    }
};

// Helper function to reset filters and restore original state data in memory (no server fetch)
const resetFilters = ({ inDataList, inFormElement, inMenu, inAllRecords, inOnResetState } = {}) => {
    const localDataList = inDataList;
    const localFormElement = inFormElement;
    const localMenu = inMenu;
    const localAllRecords = inAllRecords || [];
    const localOnResetState = inOnResetState;

    // 1. Clear form input fields
    if (localFormElement) {
        const inputs = localFormElement.querySelectorAll("input");
        inputs.forEach(input => {
            input.value = "";
        });
    }

    if (typeof localOnResetState === "function") {
        localOnResetState();
    }

    // 2. Resync datalist options with pristine data
    if (localDataList) {
        localDataList.update({ data: localAllRecords });
    }

    // 3. Update badge display
    if (localMenu) {
        updateBadge({
            inMenu: localMenu,
            inStateCount: localAllRecords.length,
            inTotalCount: localAllRecords.length
        });
    }

    // 4. Collapse mobile navbar drawer if open
    if (localMenu) {
        localMenu.collapseMobile();
    }
};

const startFunc = async () => {
    let dataList = null;
    let formElement = null;
    let allRecords = [];
    let stateRecords = [];

    // 3. Fetch data via dataProvider for autocomplete & record counts
    try {
        const fetchedData = await dataProvider.read();
        allRecords = Array.isArray(fetchedData) ? fetchedData : (fetchedData?.data || []);
        stateRecords = [...allRecords];
    } catch (err) {
        console.error("Failed to load records via dataProvider:", err);
    }

    // 4. Instantiate and render Dynamic Menu via json-to-dom-menu driven by JSON config
    const menu = new Menu({
        ...menuConfig,
        onItemClick: ({ inItem, inEvent }) => {
            if (inItem?.id === "reset") {
                inEvent?.preventDefault();
                resetFilters({
                    inDataList: dataList,
                    inFormElement: formElement,
                    inMenu: menu,
                    inAllRecords: allRecords,
                    inOnResetState: () => {
                        stateRecords = [...allRecords];
                    }
                });
            }
        },
        onActionClick: ({ inAction, inEvent }) => {
            if (inAction?.id === "header-reset-btn") {
                resetFilters({
                    inDataList: dataList,
                    inFormElement: formElement,
                    inMenu: menu,
                    inAllRecords: allRecords,
                    inOnResetState: () => {
                        stateRecords = [...allRecords];
                    }
                });
            } else if (inAction?.id === "header-reload-btn") {
                window.location.reload();
            }
        }
    });

    menu.render();

    // 5. Instantiate and render Form (Vertical Stacked Search Layout)
    const form = new Form({
        theme: "default",
        columns,
        config: searchConfig
    });

    const fromForm = await form.render({ inContainerId: "filter-container" });
    formElement = fromForm?.element;

    // 6. Instantiate and render DataList populated with fetched records
    dataList = new DataList({
        theme: "default",
        data: allRecords,
        columns,
        config: datalistConfig,
        targetContainerId: "datalist-container"
    });

    await dataList.render();

    // Initialize badge with total records count
    updateBadge({
        inMenu: menu,
        inStateCount: allRecords.length,
        inTotalCount: allRecords.length
    });

    // Hook up Card Filter Clear Button inside the Form Container
    const cardClearBtn = document.getElementById("card-clear-filters-btn");
    if (cardClearBtn) {
        cardClearBtn.addEventListener("click", () => {
            resetFilters({
                inDataList: dataList,
                inFormElement: formElement,
                inMenu: menu,
                inAllRecords: allRecords,
                inOnResetState: () => {
                    stateRecords = [...allRecords];
                }
            });
        });
    }

    if (!formElement) {
        console.warn("Form element was not rendered; skipping button listeners.");
        return;
    }

    const buttons = formElement.querySelectorAll("button");

    buttons.forEach(button => {
        // Skip container header clear button if handled above
        if (button.id === "card-clear-filters-btn") return;

        button.addEventListener("click", event => {
            const currentTarget = event.currentTarget;
            const closestRow = currentTarget.closest("div") || currentTarget.closest(".input-group");
            const input = closestRow?.querySelector("input");
            if (!input) return;

            const name = input.getAttribute("name");
            const value = (input.value || "").trim().toLowerCase();

            if (!value) {
                stateRecords = [...allRecords];
            } else {
                stateRecords = allRecords.filter(item => {
                    const fieldVal = String(item[name] ?? "").toLowerCase();
                    return fieldVal.includes(value);
                });
            }

            // Update datalist autocomplete options with filtered state records
            dataList.update({ data: stateRecords });

            // Update badge with matching counts
            updateBadge({
                inMenu: menu,
                inStateCount: stateRecords.length,
                inTotalCount: allRecords.length
            });
        });
    });
};

startFunc();
