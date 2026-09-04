import express from 'express';

import { router as routerFromv1 } from './v1/routes.js';

const router = express.Router();

router.use("/v1", routerFromv1);

export { router };