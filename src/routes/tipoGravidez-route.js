'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/tipoGravidez-controller');

router.get('/', controller.get);
// router.get('/:id', controller.getById);
router.get('/:partogramaId', controller.getByPartogramaId);
router.post('/', controller.post);
router.put('/', controller.put);
router.put('/cancel', controller.putCancel);

module.exports = router;
