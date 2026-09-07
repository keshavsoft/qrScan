import { Form } from "./form/index.js";

const version = "v1.0.0";

window.ks ??= {};
window.ks["json-to-dom-form"] = {
    version,
    Form
};

export { version, Form };
export default Form;
