import columns from "./columns.json" with { type: "json" };
import tableConfig from "./table/config.json" with { type: "json" };
import searchConfig from "./search/config.json" with { type: "json" };
import datalistConfig from "./datalist/config.json" with { type: "json" };

// 1. Hook to locally transported renderers (v13 with modular Form, Table, and DataList)
import { Table, Form, DataList, createDataProvider } from "../../renderers/v14/index.js";

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
    const fetchedData = await table.load();
    console.log("fetchedData : ", fetchedData);
    table.render();

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
        data: fetchedData,
        columns,
        config: datalistConfig,
        targetContainerId: "datalist-container"
    });

    dataList.render();

    const formElement = fromForm?.element;
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
        });
    });
};

startFunc();
