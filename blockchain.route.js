const express = require('express');
const router =  express.Router();

router.get('/', function(req, res){
    res.render('blockchain');
});

module.exports = router;
router.post('/post', function(req, res) {
    let name = req.body.name;
    let bandwidth = req.body.bandwidth;

    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('bandwidth', 'Bandwidth is required').notEmpty();

    var errors = req.validationErrors();
    if(errors){
        req.session.errors = errors;
        req.session.success = false;
        res.redirect('/blockchain');
    }
    else{
        req.session.success = true;
        res.redirect('/');
    }
});
router.get('/', function(req, res){
    res.render('blockchain', { success: req.session.success, errors: req.session.errors });
    req.session.errors = null;
});