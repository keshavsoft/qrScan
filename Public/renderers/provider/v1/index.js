import { createDataProvider } from "./createDataProvider.js";

const version = "v1.0.0";

window.ks ??= {};
window.ks["json-to-dom-provider"] = {
    version,
    createDataProvider
};

export { version, createDataProvider };
export default createDataProvider;
