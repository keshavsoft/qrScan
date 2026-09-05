import express from 'express';

import funcFromshowAll from './showAll/controller.js';
import funcFrominsertWithMeta from './insertWithMeta/controller.js';
import insertWithFKCheck from './insertWithFKCheck/controller.js';

const tableName = "orderItems.json";
const tablePath = "Data/orderItems.json";
const configPath = "Config/Schemas/orderItems.json";

const router = express.Router();

router.get('/showAll', (req, res) => funcFromshowAll({ req, res, inTablePath: tablePath }));
router.post('/insertWithMeta', express.json(), (req, res) => funcFrominsertWithMeta({ req, res, inTablePath: tablePath, inConfigPath: configPath }));
router.post('/insertWithFKCheck', express.json(), (req, res) => insertWithFKCheck({ req, res, inTablePath: tablePath, inConfigPath: configPath }));

export { router };