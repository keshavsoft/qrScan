import { JSONFilePreset } from 'lowdb/node';

const saveData = async ({ inTablePath, inData }) => {
    const db = await JSONFilePreset(inTablePath, []);
    db.data = inData;
    await db.write();
};

export default saveData;
