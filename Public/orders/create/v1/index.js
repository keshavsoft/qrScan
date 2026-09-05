import columns from "./columns.json" with { type: "json" };
import formConfig from "./form/config.json" with { type: "json" };
import datalistConfig from "./datalist/config.json" with { type: "json" };

// 1. Hook to locally transported renderers (v3 with clean Layout and Theme separation)
import { Form, DataList, createDataProvider } from "../../../renderers/v3/src/index.js";

// 2. Data Provider configured with endpoints for autocomplete reading and order insertion
const dataProvider = createDataProvider({
    inReadUrl: "/api/v2/orders/showAll",
    inCreateUrl: "/api/v2/orders/insertWithMeta"
});

const startFunc = async () => {
    // 3. Fetch existing data directly from dataProvider for autocomplete (no Table dependency!)
    const fetchedData = await dataProvider.read();

    // 4. Instantiate and render DataList populated with fetched records for autocomplete
    const dataList = new DataList({
        theme: "default",
        data: fetchedData,
        columns,
        config: datalistConfig,
        targetContainerId: "datalist-container"
    });

    dataList.render();

    // Support testing layout/theme directly via URL query params (?layout=horizontal, ?layout=inline, ?theme=dark)
    const urlParams = new URLSearchParams(window.location.search);
    const layoutParam = urlParams.get("layout");
    const themeParam = urlParams.get("theme");

    if (layoutParam === "inline" || layoutParam === "horizontal") {
        const container = document.querySelector(".container");
        if (container) container.style.maxWidth = "960px";
    }

    // 5. Instantiate and render Create Form
    const form = new Form({
        layout: layoutParam || formConfig.layout,
        theme: themeParam || formConfig.theme,
        columns,
        config: formConfig,
        targetContainerId: "form-container"
    });
    window.form = form;

    const fromForm = form.render();
    const formElement = fromForm.element;

    // 6. Handle Create Order submission
    const createButton = formElement.querySelector("button[name='createButton']");

    if (createButton) {
        createButton.addEventListener("click", async () => {
            const orderIdInput = formElement.querySelector("input[name='orderId']");
            const customerNameInput = formElement.querySelector("input[name='CustomerName']");
            const customerMobileInput = formElement.querySelector("input[name='CustomerMobile']");
            const orderDateInput = formElement.querySelector("input[name='OrderDate']");
            const orderNumberInput = formElement.querySelector("input[name='OrderNumber']");

            const newRecord = {
                orderId: orderIdInput?.value ? Number(orderIdInput.value) : Date.now(),
                CustomerName: customerNameInput?.value || "",
                CustomerMobile: customerMobileInput?.value || "",
                OrderDate: orderDateInput?.value || "",
                OrderNumber: orderNumberInput?.value || ""
            };

            try {
                createButton.disabled = true;
                createButton.textContent = "Creating...";

                const result = await dataProvider.create({ inItem: newRecord });
                console.log("Order created successfully:", result);

                // Reset input fields
                if (orderIdInput) orderIdInput.value = "";
                if (customerNameInput) customerNameInput.value = "";
                if (customerMobileInput) customerMobileInput.value = "";
                if (orderDateInput) orderDateInput.value = "";
                if (orderNumberInput) orderNumberInput.value = "";

                // Refresh autocomplete datalist with newly added record
                const updatedData = await dataProvider.read();
                dataList.update({ data: updatedData });

                alert("Order created successfully!");
            } catch (error) {
                console.error("Failed to create order:", error);
                alert("Failed to create order: " + error.message);
            } finally {
                createButton.disabled = false;
                createButton.textContent = "Create Order";
            }
        });
    }
};

startFunc();
