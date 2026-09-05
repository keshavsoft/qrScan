import express from 'express';

import funcFrominsertWithFKCheck from './insertWithFKCheck/controller.js';

const tableName = "orderItems.json";
const tablePath = "Data/orderItems.json";
const configPath = "Config/Schemas/orderItems.json";

const router = express.Router();

router.post('/insertWithFKCheck', express.json(), (req, res) => funcFrominsertWithFKCheck({ req, res, inTablePath: tablePath, inConfigPath: configPath }));

export { router };