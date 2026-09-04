const dval = ({ inRequestBody, pk }) => {
    if (!inRequestBody || typeof inRequestBody !== "object") {
        const err = new Error("Request body must be an object");
        err.status = 400;
        throw err;
    }

    if (inRequestBody[pk] === undefined) {
        const err = new Error(`${pk} is required for update`);
        err.status = 400;
        throw err;
    }
};

export default dval;
