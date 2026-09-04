import { JSONFilePreset } from 'lowdb/node';
import { ConflictError, StorageError } from "./errors.js";

/**
 * Deletes a record from the database by its primary key.
 * 
 * @param {Object} params
 * @param {string|number} params.inPk - The primary key of the record to delete
 * @param {string} params.inTablePath - The file path to the JSON database
 * @throws {ConflictError} if the record with the given primary key does not exist
 * @throws {StorageError} if reading or writing to the database file fails
 * @returns {Promise<boolean>} returns true upon successful deletion
 */
const startFunc = async ({ inPk: pkToDelete, inTablePath: dbFilePath }) => {
    let db;
    
    // 1. Initialize and read database file
    try {
        db = await JSONFilePreset(dbFilePath, []);
        await db.read();
    } catch (error) {
        throw new StorageError(`Failed to load database from: ${dbFilePath}`);
    }

    // 2. Identify the target primary key
    const targetPk = parseInt(pkToDelete, 10);
    
    // 3. Verify record exists before deletion
    const recordExists = db.data.some(record => record.pk === targetPk);
    if (!recordExists) {
        throw new ConflictError(`Record with primary key (pk) '${pkToDelete}' not found.`);
    }

    // 4. Perform the deletion (filter out the target record)
    db.data = db.data.filter(record => record.pk !== targetPk);

    // 5. Save changes to storage
    try {
        await db.write();
    } catch (error) {
        throw new StorageError(`Failed to save database changes to: ${dbFilePath}`);
    }

    return true;
};

export { startFunc };
