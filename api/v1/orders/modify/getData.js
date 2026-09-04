import { JSONFilePreset } from 'lowdb/node';

const getData = async ({ inTablePath }) => {
    const db = await JSONFilePreset(inTablePath, []);
    await db.read();

    const data = db.data;
    if (!Array.isArray(data)) {
        const err = new Error("Data table is not an array");
        err.status = 500;
        throw err;
    }

    return data;
};

export default getData;
