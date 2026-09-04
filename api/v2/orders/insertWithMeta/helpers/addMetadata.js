import { randomUUID } from "crypto";

const addMetadata = ({ inRecord }) => {
    return {
        ...inRecord,
        DateTime: new Date().toISOString(),
        Uuid: randomUUID()
    };
};

export default addMetadata;
