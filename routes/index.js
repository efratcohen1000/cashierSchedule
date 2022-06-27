const path = require('path');
const db = require('../models');

const express = require('express');

const workScheduleController = require('../controller/workSchedule');
const { check,validationResult } = require('express-validator');

const router = express.Router();

console.log("i am in index");
/* GET home page.
router.get('/', function(req, res, next) {
  console.log("i am in home page");
  res.render('login');
});*/
router.get('/public', workScheduleController.getCss);
router.post('/index/checkLogin', workScheduleController.postCheckLogin);
router.post('/myInlay', workScheduleController.postmyInlay);
//----------------------------show the page--------------------------------------------------
router.post('/workOrganiser', workScheduleController.postWorkOrganiser);
router.post('/passwordSuccessfullyIssued', workScheduleController.postPasswordSuccessfullyIssued);
router.post('/logout',workScheduleController.postLogout );
router.post('/checkLogin', workScheduleController.postCheckLogin);
router.post('/employees', workScheduleController.postEmployees);
router.post('/sendPersonalMessageToChangeCalendar', workScheduleController.postSendPersonalMessageToChangeCalendar);
router.post('/inlayWorking', workScheduleController.postInlayWorking);
router.post('/watchingWorkingSchedule', workScheduleController.postWatchingWorkingSchedule);
router.post('/SendPersonalMessage', workScheduleController.postSendPersonalMessage);
router.post('/IssuePasswordToEmployee', workScheduleController.postIssuePasswordToEmployee);
router.post('/defineWriterHoursAndNumberOfEmployees', workScheduleController.postDefineWriterHoursAndNumberOfEmployees);
router.post('/viewEmployeeRequests', workScheduleController.postViewEmployeeRequests);
router.post('/setUpInquiries', workScheduleController.postSetUpInquiries);
router.post('/viewRequests', workScheduleController.postViewRequests);
router.post('/scheduling', workScheduleController.postScheduling);
router.post('/cashierEntry', workScheduleController.postCashierEntry);


//----------------------------------message------------------------------------
router.post('/ViewingEmployeeSchedule', workScheduleController.postViewingEmployeeSchedule);
router.post('/theDataWasSuccessfullySent', workScheduleController.postTheDataWasSuccessfullySent);

router.post('/theInlayWasSuccessful', workScheduleController.postTheInlayWasSuccessful);

//----------------------------------save in database------------------------------------------
router.post('/saveEmployee', workScheduleController.postSaveEmployee);
router.post('/saveMessage', workScheduleController.postSavePersonalMessage);
router.post('/theMessageHasBeenSent', workScheduleController.postTheMessageHasBeenSent);
router.post('/saveWriterHours', workScheduleController.postSaveWriterHours);
router.post('/saveEmployeeRequest', workScheduleController.postSaveEmployeeRequest);//cashier
//router.post('/savePassword',workScheduleController);


//--------------------------------show the database---------------------------------
router.get('/watchingEmployees', workScheduleController.getWatchingEmployees);
router.post('/validationWatchingWorkingSchedule',workScheduleController.postValidationWatchingWorkingSchedule);
//--------------------------------change the data---------------------------------
router.post('/changeEmployee', workScheduleController.postChangeEmployee);
router.post('/deleteEmployee', workScheduleController.postDeleteEmployee);
router.post('/setWatchedMessages', workScheduleController.postWatchedMessages);
router.post('/deleteMessage', workScheduleController.postDeleteMessage);
router.post('/deleteMessageOrganizer', workScheduleController.postDeleteMessageOrganizere);


router.post('/saveDate', workScheduleController.postSaveDate);




module.exports = router;
