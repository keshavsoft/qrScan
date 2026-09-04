import getSchema from "./getSchema.js";
import dval from "./dval.js";
import getData from "./getData.js";
import updateRecord from "./updateRecord.js";
import saveData from "./saveData.js";

const startFunc = async ({ inRequestBody, inTablePath, inConfigPath, showLog }) => {
    const log = (...args) => {
        if (showLog === "true" || showLog === true) {
            console.log(...args);
        };
    };

    log("[Modify Service] Started processing request");

    // 1. Get primary key from schema
    log("[Modify Service] Step 1: Discovering primary key from schema config at:", inConfigPath);
    const pk = await getSchema({ inConfigPath });
    log("[Modify Service] Primary key discovered:", pk);

    // 2. Validate request body
    log("[Modify Service] Step 2: Validating input data");
    dval({ inRequestBody, pk });
    log("[Modify Service] Input data validation passed");

    // 3. Read data
    log("[Modify Service] Step 3: Reading table data from path:", inTablePath);
    const data = await getData({ inTablePath });
    log(`[Modify Service] Successfully read ${data.length} records`);

    // 4. Update the record
    const pkValue = inRequestBody[pk];
    log(`[Modify Service] Step 4: Updating record where ${pk} = ${pkValue}`);
    const { updatedData, updatedRecord } = updateRecord({ data, inRequestBody, pk });
    log("[Modify Service] Record merged successfully:", updatedRecord);

    // 5. Save the updated data array
    log("[Modify Service] Step 5: Saving updated data back to storage");
    await saveData({ inTablePath, inData: updatedData });
    log("[Modify Service] Data stored successfully. Process complete.");

    return updatedRecord;
};

export { startFunc };
