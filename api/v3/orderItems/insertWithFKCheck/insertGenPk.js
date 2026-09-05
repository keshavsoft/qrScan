import insertBase from "./insertBase.js";
import getData from "./helpers/getData.js";
import getSchema from "./helpers/getSchema.js";
import { getPrimaryKey, attachPrimaryKey } from "./helpers/pkHelper.js";
import addMetadata from "./helpers/addMetadata.js";

const validateInput = ({ record }) => {
    if (!record || typeof record !== "object") throw new Error("record must be object");
};

const insertGenPk = async ({ inRequestBody, inTablePath, inConfigPath, inIsIncludeMetaData = false }) => {
    validateInput({ record: inRequestBody });

    let recordWithMetadata = inRequestBody;

    if (inIsIncludeMetaData) {
        recordWithMetadata = addMetadata({ inRecord: inRequestBody });
    };

    //  only i added code ::From
    const localFKData = await getData({
        inTablePath: "Data/orders.json"
    });

    const fkExists = localFKData.some(
        (item) => item.orderId === recordWithMetadata.orderId
    );

    if (!fkExists) {
        return {
            message: `Foreign key does not exist for orderId: ${recordWithMetadata.orderId}`
        };
    };

    //  :End

    const schema = await getSchema({ inConfigPath });
    const pk = getPrimaryKey(schema.columnsConfig);

    if (recordWithMetadata[pk] !== undefined) {
        return insertBase({ inRequestBody: recordWithMetadata, inTablePath });
    };

    const data = await getData({ inTablePath });
    const newRecord = attachPrimaryKey(recordWithMetadata, pk, data);

    await insertBase({
        inRequestBody: newRecord,
        inTablePath
    });

    return newRecord[pk];
};

export default insertGenPk;