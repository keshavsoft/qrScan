import { exec } from "child_process";
import dotenv from 'dotenv'
dotenv.config({ path: '.env' })

import express from "express";

import { router as routerFromapi } from './api/routes.js';

import setupRoutes from "./routes.js";
import startServer from "./server.js";

const app = express()

setupRoutes(app);

const { port } = startServer(app);

app.use("/api", routerFromapi);

if (process.env.OPEN_BROWSER === "true") {
    // exec(`start http://localhost:${port}/v3/doctors/index.html`);
};
