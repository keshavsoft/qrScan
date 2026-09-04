import http from "http";
import normalizePort from "./port.js";

export default function startServer(app) {
    const port = normalizePort(process.env.PORT || 9012);
    const server = http.createServer(app);

    server.listen(port, () => {
        console.log(`http://localhost:${port}`);
    });

    return { port }; // 👈 add this
};