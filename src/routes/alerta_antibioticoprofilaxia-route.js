'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/alerta_antibioticoprofilaxia-controller');

//router.get('/', controller.get);
// router.get('/:id', controller.getById);
router.get('/:partogramaId', controller.getByPartogramaId);
router.post('/', controller.post);

module.exports = router;
