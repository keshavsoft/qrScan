import columns from "./columns.json" with { type: "json" };
import data from "./data.json" with { type: "json" };
import tableConfig from "./table/config.json" with { type: "json" };
import searchConfig from "./search/config.json" with { type: "json" };
import datalistConfig from "./datalist/config.json" with { type: "json" };

// Import everything cleanly from CDN
import { Table, Form, DataList } from "https://cdn.jsdelivr.net/gh/keshavsoft/json-to-dom-renderers/docs/dist/v10/min.js";

async function fetchUserData() {
    const url = '/api/v2/orders/showAll';

    try {
        // 1. Wait for the network request to complete
        const response = await fetch(url);

        // 2. Check if the HTTP status code is OK (200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // 3. Wait for the data to parse into a JavaScript object
        const data = await response.json();
        console.log(data);

    } catch (error) {
        // Catches network failures or errors thrown above
        console.error('Fetch operation failed:', error.message);
    }
};


const startFunc = async () => {
    // 1. Instantiate Table with clean public API
    const fetchData = await fetchUserData();
    const table = new Table({
        theme: "dark",
        data: fetchData,
        columns,
        config: tableConfig,
        targetContainerId: "table-container"
    });

    table.render();

    // 2. Instantiate and render Form with config-driven activeColumns
    const form = new Form({
        columns,
        config: searchConfig,
        targetContainerId: "filter-container"
    });

    const fromForm = form.render();

    // 3. Instantiate and render DataList with its own independent config
    const dataList = new DataList({
        data,
        columns,
        config: datalistConfig,
        targetContainerId: "datalist-container"
    });

    dataList.render();

    const formElement = fromForm.element;
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

startFunc().then();
