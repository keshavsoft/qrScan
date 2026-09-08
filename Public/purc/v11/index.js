import columns from "./columns.json" with { type: "json" };
import tableConfig from "./table/config.json" with { type: "json" };
import searchConfig from "./search/config.json" with { type: "json" };
import datalistConfig from "./datalist/config.json" with { type: "json" };
import menuConfig from "./menu/config.json" with { type: "json" };

// 1. Renderers pulled via GitHub Pages docs/dist bundles
import { Table } from "https://keshavsoft.github.io/json-to-dom-table/dist/v2/min.js";
import { Form } from "https://keshavsoft.github.io/json-to-dom-form/dist/v1/min.js";
import { DataList } from "https://keshavsoft.github.io/json-to-dom-datalist/dist/v2/min.js";
import { createDataProvider } from "https://keshavsoft.github.io/json-to-dom-provider/dist/v1/min.js";
import { Menu } from "https://keshavsoft.github.io/json-to-dom-menu/dist/v1/min.js";

// 2. Event listeners and menu actions
import { onItemClick, onActionClick, addListeners, updateBadge } from "./addListeners.js";

// 3. Data Provider configured with endpoints for autocomplete reading and order insertion
const dataProvider = createDataProvider({
    inReadUrl: "./data.json",
    inCreateUrl: "./data.json"
});

const startFunc = async () => {
    // 4. Instantiate and render Dynamic Menu via json-to-dom-menu
    const menu = new Menu({
        ...menuConfig,
        onItemClick,
        onActionClick
    });
    menu.render();

    // 5. Instantiate Table with dataProvider
    const table = new Table({
        theme: "default",
        columns,
        config: tableConfig,
        dataProvider
    });
    const fetchedData = await table.render({ inContainerId: "table-container" });
    console.log("3. render (Full) : ", fetchedData);

    // 6. Instantiate and render Form
    const form = new Form({
        theme: "default",
        columns,
        config: searchConfig,
        targetContainerId: "filter-container"
    });
    const fromForm = form.render();
    const formElement = fromForm?.element;

    // 7. Instantiate and render DataList populated with fetched records
    const dataList = new DataList({
        theme: "default",
        data: table.store.stateData,
        columns,
        config: datalistConfig,
        targetContainerId: "datalist-container"
    });
    await dataList.render();

    // 8. Initialize badge with total records count
    if (table?.store) {
        updateBadge({
            inMenu: menu,
            inStateCount: table.store.stateData.length,
            inTotalCount: table.store.rawData.length
        });
    }

    // 9. Hook up all DOM events (Search buttons and Card Clear button)
    addListeners({
        inTable: table,
        inDataList: dataList,
        inFormElement: formElement,
        inMenu: menu
    });
};

startFunc();
