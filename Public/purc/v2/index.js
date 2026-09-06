import columns from "./columns.json" with { type: "json" };
import tableConfig from "./table/config.json" with { type: "json" };
import spec from "./spec.json" with { type: "json" };


// 1. Hook to locally transported renderers (v14 with modular Table)
import { Table, createDataProvider } from "../../renderers/v14/index.js";

// 2. Data Provider configured with endpoints for data reading
const dataProvider = createDataProvider({
    inReadUrl: "./data.json",
    inCreateUrl: "./data.json"
});

const startFunc = async () => {
    // Instantiate Table with dataProvider
    const table = new Table({
        theme: "default",
        columns,
        config: tableConfig,
        dataProvider
    });
    console.log("table : ", spec);

    // =========================================================================
    // 1. Render Structure Only: Zero fetch, mounts table skeleton to DOM
    // =========================================================================
    // const structureResult = table.renderStructure({ inContainerId: "table-container" });
    // console.log("1. renderStructure : ", structureResult);

    // =========================================================================
    // 2. Load Spec Only: Calls fetch, builds DOM-ready JSON spec (Zero DOM)
    // =========================================================================
    // const domReadySpec = await table.loadSpec();
    // console.log("2. loadSpec (DOM-ready JSON) : ", domReadySpec);

    // =========================================================================
    // 3. Full Render: Calls fetch internally, builds spec, & mounts to DOM
    // =========================================================================
    const rendered = await table.render({ inContainerId: "table-container" });
    console.log("3. render (Full) : ", rendered);

    // const builder = window.ks?.["json-to-dom"]?.buildSpecElement; ``
    // const domElement = builder({ inSpec: spec });

    // document.getElementById("table-container").appendChild(domElement);
    // console.log("domElement : ", domElement);

};

startFunc();
