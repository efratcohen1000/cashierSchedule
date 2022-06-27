const path = require('path');

const express = require('express');

const sqlController = require('../controller/sql');

const router = express.Router();

router.post('/Inlay', sqlController.postInlay);
router.post('/Employee', sqlController.postEmployee);
router.post('/Week', sqlController.postWeek);
router.post('/FinishInlay', sqlController.postFinishInlay);
router.post('/AddEmployees',sqlController.postAddEmployees);
router.post('/ReturnFinishInlay',sqlController.postReturnFinishInlay);

module.exports = router;
