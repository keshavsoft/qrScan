import express from 'express';

import { router as routerFromv1 } from './v1/routes.js';
import { router as routerFromv2 } from './v2/routes.js';
import { router as routerFromv3 } from './v3/routes.js';

const router = express.Router();

router.use("/v1", routerFromv1);
router.use("/v2", routerFromv2);
router.use("/v3", routerFromv3);

export { router };