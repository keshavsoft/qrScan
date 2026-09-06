import columns from "./columns.json" with { type: "json" };
import tableConfig from "./table/config.json" with { type: "json" };

// 1. Hook to locally transported renderers (v13 with modular Form, Table, and DataList)
import { Table, createDataProvider } from "../../renderers/v14/index.js";

// 2. Data Provider configured with endpoints for autocomplete reading and order insertion
const dataProvider = createDataProvider({
    inReadUrl: "./data.json",
    inCreateUrl: "./data.json"
});

const startFunc = async () => {
    // 2. Instantiate Table with dataProvider (no hardcoded data!)
    const table = new Table({
        theme: "default",
        columns,
        config: tableConfig,
        dataProvider,
        targetContainerId: "table-container"
    });
    console.log("table : ", table);

    // Fetch data dynamically and render table
    // const renderedData = await table.render();
    // const localData = await table.load();

    // console.log("renderedData : ", renderedData);
    // console.log("localData : ", localData);
};

startFunc();
