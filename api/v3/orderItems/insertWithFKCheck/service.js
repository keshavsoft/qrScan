import insertGenPk from "./insertGenPk.js";

const startFunc = async ({ inRequestBody, inTablePath, inConfigPath }) => {
    const insertedPk = await insertGenPk({
        inRequestBody, inTablePath, inConfigPath,
        inIsIncludeMetaData: true
    });

    return insertedPk;
};

export { startFunc };
