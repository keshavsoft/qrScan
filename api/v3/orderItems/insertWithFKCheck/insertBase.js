import { JSONFilePreset } from 'lowdb/node'

const insertBase = async ({ inRequestBody, inTablePath }) => {
    const db = await JSONFilePreset(inTablePath, []);

    await db.update((posts) => posts.push(inRequestBody))
};

export default insertBase;
