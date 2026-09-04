import { startFunc as Service } from "./service.js";
const showLog = false;

const postFunc = async ({ req, res, inTablePath, inConfigPath }) => {
    try {
        const inRequestBody = req.body;
        // const inFlag = "showLog" in req.query ? true : req.query.showLog;
        const inFlag = "showLog" in req.query && req.query.showLog !== "false";

        const newShowLog = inFlag || showLog;

        const fromService = await Service({
            inRequestBody, inTablePath,
            inConfigPath, showLog: newShowLog
        });

        res.type("application/json").send(fromService);
    }
    catch (err) {
        if (err.status)
            return res.status(err.status).send(err.message);

        console.error(err);
        return res.status(500).send("Unexpected error");
    };
};

export default postFunc;