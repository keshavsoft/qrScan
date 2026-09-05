import express from 'express';

import funcFrominsertWithMeta from './insertWithMeta/controller.js';
import funcFromshowAll from './showAll/controller.js';

const tableName = "orders.json";
const tablePath = "Data/orders.json";
const configPath = "Config/Schemas/orders.json";

const router = express.Router();

router.post('/insertWithMeta', express.json(), (req, res) => funcFrominsertWithMeta({ req, res, inTablePath: tablePath, inConfigPath: configPath }));
router.get('/showAll', (req, res) => funcFromshowAll({ req, res, inTablePath: tablePath }));

export { router };