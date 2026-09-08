import columns from "./columns.json" with { type: "json" };
import tableConfig from "./table/config.json" with { type: "json" };
import searchConfig from "./search/config.json" with { type: "json" };
import datalistConfig from "./datalist/config.json" with { type: "json" };
import menuConfig from "./menu/config.json" with { type: "json" };

// 1. Renderers pulled via GitHub Pages docs/dist bundles
import { Form } from "https://keshavsoft.github.io/json-to-dom-form/dist/v1/min.js";
import { DataList } from "https://keshavsoft.github.io/json-to-dom-datalist/dist/v2/min.js";
import { createDataProvider } from "https://keshavsoft.github.io/json-to-dom-provider/dist/v1/min.js";

// 2. Event listeners and menu actions
import { onItemClick, onActionClick, addListeners, updateBadge } from "./addListeners.js";

// 3. Data Provider configured with endpoints for autocomplete reading and order insertion
const dataProvider = createDataProvider({
    inReadUrl: "./data.json",
    inCreateUrl: "./data.json"
});

const startFunc = async () => {
    const data = await dataProvider.read();
    console.log(data);

    const dataList = new DataList({
        theme: "default",
        data,
        columns,
        config: datalistConfig,
        targetContainerId: "datalist-container"
    });
    await dataList.render();

    // 6. Instantiate and render Form
    const form = new Form({
        theme: "default",
        columns,
        config: searchConfig,
        targetContainerId: "filter-container"
    });
    const fromForm = form.render();
};

startFunc();
