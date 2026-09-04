import { startFunc as Service } from "./service.js";
import { ConflictError, StorageError } from "./errors.js";

const postFunc = async ({ req, res, inTablePath, inConfigPath }) => {
    try {
        const inRequestBody = req.body;

        const fromService = await Service({
            inRequestBody, inTablePath,
            inConfigPath
        });

        res.type("application/json").send(fromService);
    } catch (err) {

        if (err instanceof ConflictError)
            return res.status(409).send(err.message);

        if (err instanceof StorageError)
            return res.status(500).send("Failed to persist data");

        console.error(err);
        res.status(500).send("Unexpected error");
    }
};

export default postFunc;