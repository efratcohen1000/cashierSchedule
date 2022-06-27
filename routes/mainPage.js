const path = require('path');

const express = require('express');

const workScheduleController = require('../controller/workSchedule');

const router = express.Router();
console.log("i am in mainPage");

router.get('/', workScheduleController.getLogin);

module.exports = router;