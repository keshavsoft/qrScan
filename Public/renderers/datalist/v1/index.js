import { DataList } from "./datalist/index.js";

const version = "v1.0.0";

window.ks ??= {};
window.ks["json-to-dom-datalist"] = {
    version,
    DataList
};

export { version, DataList };
export default DataList;
