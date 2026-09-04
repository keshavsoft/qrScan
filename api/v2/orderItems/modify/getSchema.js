import { JSONFilePreset } from 'lowdb/node';

const getSchema = async ({ inConfigPath }) => {
    const schemaDb = await JSONFilePreset(inConfigPath, {});
    await schemaDb.read();

    if (!schemaDb.data || !Array.isArray(schemaDb.data.columnsConfig)) {
        const err = new Error("Invalid schema configuration");
        err.status = 500;
        throw err;
    }

    const pkColumn = schemaDb.data.columnsConfig.find(c => c.primary);
    if (!pkColumn) {
        const err = new Error("Primary key not defined in schema");
        err.status = 500;
        throw err;
    }

    return pkColumn.field;
};

export default getSchema;
