import express from 'express';

import { router as routerFromorders } from './orders/end-points.js';

const router = express.Router();

router.use("/orders", routerFromorders);

export { router };