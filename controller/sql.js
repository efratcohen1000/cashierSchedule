const db = require('../models');

exports.postFinishInlay = (req, res, next) => {
    db.finishInlay.destroy({
        where: {},
        truncate: true
    });
    res.setHeader('Content-Type', 'application/json');


    for (var i=0; i<req.body.array.length; i++) {
        let emp = {
            day: translateDay(req.body.array[i].day),
            idEmp: req.body.array[i].id,
            shift: req.body.array[i].shift,
            color: req.body.array[i].color,
            firstName: req.body.array[i].firstName,
            lastName: req.body.array[i].lastName,
            state: req.body.array[i].state,
        };
        db.finishInlay.create(emp);
    }

};
exports.postAddEmployees = (req, res, next) => {
    db.addEmployees.destroy({
        where: {},
        truncate: true
    });
    res.setHeader('Content-Type', 'application/json');
    for (var i=0; i<req.body.arrays.length; i++) {
        let emp = {
            id: req.body.arrays[i].id,
            firstName: req.body.arrays[i].firstName,
            lastName: req.body.arrays[i].lastName,
            phone: req.body.arrays[i].phone,
            email: req.body.arrays[i].email,
            state: req.body.arrays[i].state,
            counter: req.body.arrays[i].counter,
            color: req.body.arrays[i].color,
        };
        db.addEmployees.create(emp);
    }
};


function translateDay(value){
    if(value == 1)
        return "ראשון";
    if(value == 2)
        return "שני";
    if(value == 3)
        return "שלישי";
    if(value == 4)
        return "רביעי";
    if(value == 5)
        return "חמישי";
    if(value == 6)
        return "שישי";
    if(value ==7)
        return "שבת";
}

exports.postReturnFinishInlay = (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    db.finishInlay.findAll()
        .then( prod=>{
            if(prod!=null) {
                res.write(JSON.stringify(prod));
                return res.end();
            }
        });
};
exports.postInlay = (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    console.log("i am in postDefineHours");
    db.inlayWorks.findAll()
        .then( prod=>{
            if(prod!=null) {
                console.log("result" + JSON.stringify(prod));
                res.write(JSON.stringify(prod));
                return res.end();
            }
        });
};
exports.postWeek = (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    db.Week.findAll()
        .then( prod=>{
            if(prod!=null) {
                console.log("result" + JSON.stringify(prod));
                res.write(JSON.stringify(prod));
                return res.end();
            }
        });
};

exports.postEmployee = (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    db.addEmployees.findAll()
        .then( prod=>{
            if(prod!=null) {
                console.log("result" + JSON.stringify(prod));
                res.write(JSON.stringify(prod));
                return res.end();
            }
        });
};