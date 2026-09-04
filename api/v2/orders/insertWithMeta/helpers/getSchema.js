import { JSONFilePreset } from 'lowdb/node'

const startFunc = async ({ inConfigPath }) => {
    const db = await JSONFilePreset(inConfigPath, {});

    await db.read();

    return await db.data;
};

export default startFunc;
