import express from 'express';

import { router as routerFromorderItems } from './orderItems/end-points.js';

const router = express.Router();

router.use("/orderItems", routerFromorderItems);

export { router };