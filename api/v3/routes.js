import express from 'express';

import { router as routerFromorders } from './orders/end-points.js';
import { router as routerFromorderItems } from './orderItems/end-points.js';

const router = express.Router();

router.use("/orders", routerFromorders);
router.use("/orderItems", routerFromorderItems);

export { router };