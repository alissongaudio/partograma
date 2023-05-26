'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/allDocuments-controller');

router.get('/:partogramaId', controller.getByPartogramaId);
router.get('/', controller.get);

module.exports = router;
