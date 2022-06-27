
console.log("i am in workSchedule");

const db = require('../models');
const func = require('../controller/function');

exports.getCss = (req, res, next) => {
    console.log("i am in getCss");
    res.render('/public/stylesheets/PageDesign', {
        pageTitle: 'Home Page',
        path: '/public/stylesheets/PageDesign'
    });
};

exports.getLogin = (req, res, next) => {
    let today = new Date();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    console.log(today+"  "+time);
    /*if(today.toString().split(' ')[0]==="Sun" && time ==="00:00:00")
    {
        db.inlayWorks.destroy({where: {}, truncate: true});
    }*/
    console.log("i am in getLogin");
    res.render('login', {
        pageTitle: 'Home Page',
        path: '/',
        error:{id:"",password:""},
    });
};



exports.postLogout = (req,res,next)=>
{
    console.log("logout");
    router.get('/logout',(req, res) =>{
        res.json({});
    });
};

exports.postWorkOrganiser = (req, res, next) => {
    let respWork,respEm;
    db.Week.findAll({
        where: {},
    }).then(function (prod) {
        if (prod != null) {
            respWork = prod;
            db.addEmployees.findAll({
                where: {},
            }).then(function (prod) {
                if (prod != null) {
                    respEm = prod;
                    res.render('workOrganiser', {
                        pageTitle: 'work Organiser',
                        path: '/admin/workOrganiser',
                        data: JSON.stringify(respWork),
                        dataE: JSON.stringify(respEm)
                    })
                }
            })
        }
    });
};

exports.postCheckLogin = (req, res, next) => {
    console.log("i am in postCheckLogin");
    req.session.userName = req.body.username;
    let error = {id: "", password: ""};
    let week, respWork, respEm;
    db.Week.findAll()
        .then(function (response) {
            week = response;
        });
    //-------------------------work organiser-------------------------------
    db.passwordLogin.findOne({
        where: {id: req.body.username, password: req.body.password, roleNumber: 1},
    }).then(prod => {
        if (prod !== null) {
            db.Week.findAll({
                where: {},
            }).then(function (prod) {
                if (prod != null) {
                    respWork = prod;
                    db.addEmployees.findAll({
                        where: {},
                    }).then(function (prod) {
                        if (prod != null) {
                            respEm = prod;
                            res.render('workOrganiser', {
                                pageTitle: 'work Organiser',
                                path: '/workOrganiser',
                                data: JSON.stringify(respWork),
                                dataE: JSON.stringify(respEm)
                            })
                        }
                    })

                }
            })
        }
    })
    let resp;
    db.finishInlay.findAll({
        where: {idEmp: req.session.userName},
    }).then(function (prod) {
        if (prod != null) {
            let today = new Date();
            respWork = prod;
            let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            console.log(today + "  " + time);
            if (today.toString().split(' ')[0] === "Sun" && time == "00:00:00") {
                //db.inlayWorks.destroy({where: {}, truncate: true});
                resp = "אנא מלא את הזמנים שבו אתה רוצה להגיע לעבודה";
            }
            resp = prod;
        }
    });
    //------------------------cashierEntry------------------------------------------
    db.passwordLogin.findOne({
        where: {id: req.body.username, password: req.body.password, roleNumber: 2},
    }).then(prod => {
        if (prod !== null) {
            db.addEmployees.findOne({
                where: {id: req.body.username},
            }).then(prod => {
                res.render('CashierEntry', {
                    pageTitle: 'Cashier Entry',
                    path: '/admin/CashierEntry',
                    name: prod.firstName + " " + prod.lastName,
                    data: JSON.stringify(resp)
                })
            })
        }
    }).catch((err) => {
        console.log(err);
    });
    //----------------------------validation-----------------------------
    db.passwordLogin.findOne({
        where: {id: req.body.username, password: req.body.password},
    }).then(prod => {
        if (prod === null) {
            error.id = "שם משתמש או סיסמא אינם נכונים אם אינך זוכר/ת אם הסיסמא אנא פנה לסדרן העבודה";
            res.render('login', {
                pageTitle: 'Home page',
                path: '/',
                error: error

            })
        }
    }).catch((err) => {
        console.log(err);
    });
};

exports.postmyInlay = (req, res, next) => {

    db.inlayWorks.findAll({where:{idEmp:req.session.userName},
    }).then(function(response) {
        db.addEmployees.findOne({
            where: {id: req.session.userName},
        }).then(prod => {
            dataName = prod.firstName;
            res.render('myInlay', {
                pageTitle: 'my Inlay',
                path: '/cashierEntry/myInlay',
                name:dataName + " " + prod.lastName,
                data:JSON.stringify(response)
            });
        })
    });

};
exports.postCashierEntry = (req, res, next) => {
    db.finishInlay.findAll({where:{idEmp:req.session.userName},
    }).then(function(response) {
        console.log("result:  "+JSON.stringify(response));
        db.addEmployees.findOne({
            where: {id: req.session.userName},
        }).then(prod => {
            dataName = prod.firstName;
            res.render('CashierEntry', {
                pageTitle: 'Cashier Entry',
                path: '/index/CashierEntry',
                name:dataName + " " + prod.lastName,
                data:JSON.stringify(response)
            });
        })
    });
};
exports.postEmployees = (req, res, next) => {
    console.log("i am in postEmployees");
    res.render('employees', {
        error:{id:"",firstName:"",lastName:"",phone: "",email: "",state: ""},
        pageTitle: 'work Organise',
        path: '/admin/employees',
    });
};


exports.postInlayWorking = (req, res, next) => {
    console.log("i am in inlayWorking");
    db.employeeRequests.findAll()
        .then(function(respons) {
            db.addEmployees.findAll()
                .then(function (response) {
                    res.render('inlayWorking', {
                        error: {date: "", family: ""},
                        data: JSON.stringify("00:00:00"),
                        dataEmployees: JSON.stringify(response),
                        dataMessage:JSON.stringify(respons),
                        pageTitle: 'inlay Working',
                        path: '/admin/inlayWorking ',
                    });
                });
        });
};


exports.postWatchingWorkingSchedule = (req, res, next) => {
    console.log("i am in postWatchingWorkingSchedule");
    res.render('watchingWorkingSchedule', {
        error:{id:"",firstName:"",lastName:""},
        pageTitle: 'Watching Working Schedule',
        path: '/admin/watchingWorkingSchedule ',
    });
};
exports.postValidationWatchingWorkingSchedule = (req,res,next) => {
    let nameEmp,respEmp;
    let emp = {
        id: req.body.Id,
        firstName: req.body.name,
        lastName: req.body.family,
    };
    let error = {id: "", firstName: "", lastName: ""};
    //------------check Length------------------------------------
    if (checkLength(emp.id, 9)) {
        error.id = "תעודת זהות צריך להכיל 9 ספרות";
    }
    if (!checkLength(emp.lastName, 1)) {
        error.lastName = "שם פרטי צריך להכיל יותר מ 2 תווים"
    }
    if (!checkLength(emp.firstName, 1)) {
        error.firstName = "שם משפחה צריך להכיל יותר מ 2 תווים"
    }
    //-----------check Is empty-----------------------------------
    if (checkIsempty(emp.id)) {
        error.id = "תעודת זהות ריק";
    }
    //------------------------------------------------------------
    if (checkIsDigit(emp.id)) {
        error.id = "תעודת זהות צריך להכיל מספרים בלבד";
    }
    if (checkIsCharacters(emp.firstName)) {
        error.firstName = "שם פרטי צריך להכיל אותיות בלבד!";
    }
    if (checkIsCharacters(emp.lastName)) {
        error.lastName = "שם משפחה צריך להכיל אותיות בלבד";
    }
    //--------------------else------------------------------------------
    if (error.id !== "" || error.firstName !== "" || error.lastName !== "") {
        res.render('watchingWorkingSchedule', {
            error: error,
            pageTitle: 'watching Working Schedule',
            path: '/admin/watchingWorkingSchedule',
        });
    } else {

        db.finishInlay.findAll({
            where: {idEmp: emp.id},
        }).then(function (prod) {
            if (prod != null) {
                respEmp = prod;
                console.log("finishInlay"+JSON.stringify(prod));
                db.addEmployees.findOne({
                    where: {id: req.body.Id},
                }).then(function (emp) {
                    if (emp != null) {
                        nameEmp = emp.firstName + " " + emp.lastName;
                        res.render('ViewingEmployeeSchedule', {
                            pageTitle: 'Watching Working Schedule',
                            path: '/admin/ViewingEmployeeSchedule',
                            data: JSON.stringify(respEmp),
                            send: nameEmp
                        })
                    }
                })
            }
        });
    }
};
exports.postSendPersonalMessage = (req, res, next) => {
    console.log("i am in postWatchingWorkingSchedule");

    res.render('SendPersonalMessage', {
        error:{id:"",firstName:"",lastName:"",contantMessage:""},
        pageTitle: 'Send Personal Message',
        path: '/admin/SendPersonalMessage',
    });
};
/*exports.postWatchingEmployees = (req, res, next) => {
    console.log("i am in postwatchingEmployees");
    res.render('watchingEmployees', {
        pageTitle: 'watching Employees',
        path: '/admin/watchingEmployees',});};*/
exports.postIssuePasswordToEmployee = (req, res, next) => {
    console.log("i am in postIssuePasswordToEmployee");
    res.render('IssuePasswordToEmployee', {
        pageTitle: 'Issue Password To Employee',
        path: '/admin/passwordSuccessfullyIssued',
        error:{id:"",password:""}
    });
};



exports.postDefineWriterHoursAndNumberOfEmployees = (req, res, next) => {
    var counterMainEmp = 0, countEmp = 0;
    let arrayEmp = [];
    let error = {date: "", numCashier: "", numMainCashier: "", fridom: ""};
    db.addEmployees.findAll({
        where: {},
    }).then(prod => {
        if (prod) {
            for (var i = 0; i < prod.length; i++)
                arrayEmp.push(prod[i]) /*+= {state: prod[i].state}*/;
            console.log("arrayEmp" + JSON.stringify(arrayEmp));
        }
        for (var i = 0; i < arrayEmp.length; i++) {
            if (arrayEmp[i].state == "קופאי ראשי") {
                counterMainEmp++;

            }
            if (arrayEmp[i].state == "קופאי") {
                countEmp++;
            }
        }
        console.log("קופאי ראשי" + counterMainEmp);
        console.log("קופאי" + countEmp);
        console.log("i am in postDefineWriterHoursAndNumberOfEmployees");
        res.render('defineWriterHoursAndNumberOfEmployees', {
            pageTitle: 'Define Writer Hours And Number Of Employees',
            path: '/admin/defineWriterHoursAndNumberOfEmployees',
            error: {date: "", numCashier: "", numMainCashier: "", fridom: ""},
            counterMainEmp: JSON.stringify(counterMainEmp),
            countEmp: JSON.stringify(countEmp)
        });
    });
};

exports.postViewEmployeeRequests = (req, res, next) => {
    db.employeeRequests.findAll()
        .then(function(respons) {
            db.addEmployees.findAll()
                .then(function(response) {
                    res.render('viewEmployeeRequests', {
                        pageTitle: 'view Employee Requests',
                        path: '/admin/viewEmployeeRequests',
                        dataEmployees: JSON.stringify(response),
                        dataMessage:JSON.stringify(respons)
                    });
                })
                .catch((err) => {
                    res.send({error:err});
                    console.log('error', JSON.stringify(err))
                });
        })
        .catch((err) => {
            res.send({error:err});
            console.log('error', JSON.stringify(err))
        });
};



exports.postPasswordSuccessfullyIssued = (req, res, next) => {
    let emp={
        id:req.body.Id,
        password:req.body.password,
    };
    let error={id:"",password:""};
    //------------check Length------------------------------------
    if(checkLength(emp.id,9)) {error.id = "תעודת זהות חייב להכיל 9 ספרות";}
    if(!checkLength(emp.password,1)) {error.password = "סיסמא חייבת להכיל יותר מ -2 תווים"}
    //-----------check Is empty-----------------------------------
    if(checkIsempty(emp.id)) {error.id = "תעודת זהות ריק";}
    if(checkIsempty(emp.password)) {error.password = "סיסמא ריק";}
    //------------------------------------------------------------
    if(checkIsDigit(emp.id)) {error.id = "תעודת זהות צריכה להכיל מספרים בלבד";}
    if(emp.password !== req.body.truePassword) {error.password = "הססמאות אינן תואמות";}
    //--------------------else------------------------------------------
    db.addEmployees.findOne({
        where: {id: req.body.Id},
    }).then(prod => {
        if (prod === null){
            error.id="האדם אינו רשום במערכת";
            res.render('IssuePasswordToEmployee', {
                error: error,
                pageTitle: 'Issue Password To Employee',
                path: '/admin/IssuePasswordToEmployee',
            });
        }
    });
    if(error.id!==""||error.password!=="")
    {
        res.render('IssuePasswordToEmployee', {
            error: error,
            pageTitle: 'Issue Password To Employee',
            path: '/admin/IssuePasswordToEmployee',
        });
    }else {
        db.passwordLogin.findOne({
                where: {id: req.body.Id},
            }).then(prod => {
                console.log("prod "+JSON.stringify(prod));
                if (prod !== null && prod !== undefined) {
                    prod.update({password: req.body.password});
                    console.log("i am in postPasswordSuccessfullyIssued");
                    res.render('passwordSuccessfullyIssued', {
                        pageTitle: 'Password Successfully Issued',
                        path: '/IssuePasswordToEmployee/passwordSuccessfullyIssued',
                    })
                };
        })
        db.addEmployees.findOne({
            where: {firstName: req.body.FirstName, lastName: req.body.lastName},
        }).then(prod => {
            console.log("prod");
            if (prod !== undefined) {
                db.addEmployees.findOne({
                    where: {id: prod.id},
                }).then(prod => {
                    if (prod) {
                        prod.update({password: req.body.password});
                        console.log("i am in postPasswordSuccessfullyIssued");
                        res.render('passwordSuccessfullyIssued', {
                            pageTitle: 'Password Successfully Issued',
                            path: '/IssuePasswordToEmployee/passwordSuccessfullyIssued',
                        });
                    }
                }).catch((err) => {
                    console.log(err);
                });
            }
        });
    }
};

//------------------------message---------------------------------------------
exports.postTheInlayWasSuccessful = (req, res, next) => {
    console.log("i am in postTheInlayWasSuccessful");
    res.render('theInlayWasSuccessful', {
        pageTitle: 'The Inlay Was Successful',
        path: '/inlayWorking/postTheInlayWasSuccessful',
    });
};

exports.postTheDataWasSuccessfullySent = (req, res, next) => {
    console.log("i am in postTheDataWasSuccessfullySent");
    res.render('theDataWasSuccessfullySent', {
        pageTitle: 'The Data Was Successfully Sent',
        path: '/watchingEmployees/theDataWasSuccessfullySent',
    });
};
exports.postTheMessageHasBeenSent = (req, res, next) => {
    console.log("i am in postTheMessageHasBeenSent");
    res.render('theMessageHasBeenSent', {
        pageTitle: 'post The Message Has Been Sent',
        path: '/sendPersonalMessageToChangeCalendar/theMessageHasBeenSent',
    });
};
exports.postViewingEmployeeSchedule = (req, res, next) => {
    console.log("i am in postViewingEmployeeSchedule");
    res.render('ViewingEmployeeSchedule', {
        pageTitle: 'Watching Working Schedule',
        path: '/watchingWorkingSchedule/viewingEmployeeSchedule',
    });
};

//-------------------------cashier entry--------------------------------------------
exports.postSetUpInquiries = (req, res, next) => {
    console.log("i am in postSetUpInquiries");
    res.render('setUpInquiries', {
        pageTitle: 'set Up Inquiries',
        path: '/admin/setUpInquiries',
        error:{inlayType: "", levelOfInq: ""}
    });
};


exports.postSendPersonalMessageToChangeCalendar = (req, res, next) => {
    res.render('sendPersonalMessageToChangeCalendar', {
        error:{requestContent:"",levelUngency:""},
        pageTitle: 'send Personal Message To Change Calendar' ,
        path: '/admin/sendPersonalMessageToChangeCalendar',
    });
};


exports.postWatchedMessages = (req, res, next) => {
    db.sendPersonalMessage.findAll({
        where: {IdPerson: req.session.userName}
    }).then(function(prod){
        if(prod!==null){
            message = prod.message;
            console.log("i am in postWatchedMessages");
            res.render('WatchedMessages', {
                pageTitle: 'post Watched Messages',
                path: '/checkLogin/postWatchedMessages',
                data:JSON.stringify(prod)
            });}
        else {
            message="אין הודעות";
            res.render('WatchedMessages', {
                pageTitle: 'post Watched Messages',
                path: '/checkLogin/postWatchedMessages',
                data:JSON.stringify(message)
            })
        }
    }).catch((err) => {
        console.log(err);
        //res.render("error")
    });


};




//-------------------------sqlite------------------------------------
exports.postViewRequests = (req, res, next) => {
    console.log("i am in postViewRequests");

    console.log("watch");
    db.employeeRequests.findAll()
        .then(function(response) {
            res.render('viewRequests', {
                pageTitle: 'View Requests',
                path: '/viewEmployeeRequests/postViewRequests\'',
                data: JSON.stringify(response)
            });

        })
        .catch((err) => {
            res.send({error:err});
            console.log('error', JSON.stringify(err))
        });
};

exports.postSaveEmployee = (req, res, next) => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    let emp = {
        id: req.body.Id,
        firstName: req.body.FirstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        email: req.body.email,
        state: req.body.state,
        color: color
    };
    let pas ={
        id:req.body.Id,
        password:req.body.Id,
        roleNumber:2
    };
    let error={id:"",firstName:"",lastName:"",phone:"",email:"",state:""};
    //------------check Length------------------------------------
    if(checkLength(emp.id,9)) {error.id = "תעודת זהות חייבת להכיל  9 ספרות";}
    if(!checkLength(emp.lastName,1)) {error.lastName = "שם משפחה חייב להכיל יותר מ -2 אותיות"}
    if(!checkLength(emp.firstName,1)) {error.firstName = "שם פרטי צריך להכיל יותר מ 2 אותיות"}
    if(checkLength(emp.phone,10)) {error.phone = "פלאפון חייב להכיל 10 ספרות"}
    //-----------check Is empty-----------------------------------
    if(checkIsempty(emp.id)) {error.id = "תעודת זהות ריק";}
    if(checkIsempty(emp.firstName)) {error.firstName = "שם פרטי ריק";}
    if(checkIsempty(emp.lastName)) {error.lastName = "שם משפחה ריק";}
    if(checkIsempty(emp.phone)) {error.phone = "טלפון ריק";}
    if(checkIsempty(emp.state)) {error.state = "תפקיד ריק";}
    //---------------check the character------------------------------------
    if(checkIsDigit(emp.id)) {error.id = "תעודת זהות חייב להכיל 9 ספרות";}
    if(checkIsDigit(emp.phone)) {error.phone = "פלאפון חייב להכיל מספרים בלבד";}
    if(checkIsCharacters(emp.firstName)) {error.firstName = "שם פרטי צריך להכיל אותיות בלבד";}
    if(checkIsCharacters(emp.lastName)) {error.lastName = "שם משפחה צריך להכיל אותיות בלבד";}
    if(checkEmail(emp.email)){error.email = "אמייל לא בתבנית המתאימה";}
    if(checkIsempty(emp.email)) {error.email = "מייל ריק";}

    //--------------------else------------------------------------------
    if(error.id!==""||error.firstName!==""||error.lastName!==""||error.phone!==""||error.state!=="")
    {
        console.log("id is empty");
        res.render('employees', {
            error: error,
            pageTitle: 'add Employees',
            path: '/admin/employees',
        });
    }
    else {

        console.log(emp);
        db.addEmployees.create(emp);
        db.passwordLogin.create(pas);
        console.log("insert");
        console.log("i am in postSaveEmployee");
        res.render('thePasswordWasSuccessfullyReceived', {
            pageTitle: 'send Personal Message To Change Calendar',
            path: '/employees/thePasswordWasSuccessfullyReceived',
        });
    }

};


exports.postSavePersonalMessage = (req, res, next) => {
    let emp={
        IdPerson: req.body.Id,
        firstName:req.body.name,
        lastName:req.body.family,
        message:req.body.contantMessage
    };
    let error={IdPerson:"",firstName:"",lastName:"",message: ""};
    //------------check Length------------------------------------
    if(checkLength(emp.IdPerson,9)) {error.IdPerson = "תעודת זהות חייבת להכיל  9 ספרות";}
    if(!checkLength(emp.lastName,1)) {error.lastName = "שם מפשחה צריך להכיל יותר מ 2 תווים";}
    if(!checkLength(emp.firstName,1)) {error.firstName = "שם פרטי צריך להכיל יותר מ 2 תווים";}
    if(!checkLength(emp.message,1)) {error.message = "הודעה צריכה להכיל יותר מ 2 תווים";}
    //-----------check Is empty-----------------------------------
    if(checkIsempty(emp.IdPerson)) {error.IdPerson = "שדה זה חובה";}
    if(checkIsempty(emp.firstName)) {error.firstName =  "שדה זה חובה";}
    if(checkIsempty(emp.lastName)) {error.lastName =  "שדה זה חובה";}
    if(checkIsempty(emp.message)) {error.message = "שדה זה חובה";}
    //------------------------------------------------------------
    if(checkIsDigit(emp.IdPerson)) {error.IdPerson = "תעודת זהות חייב להכיל אותיות בלבד";}
    if(checkIsCharacters(emp.firstName)) {error.firstName = "שם פרטי צריך להכיל אותיות בלבד!";}
    if(checkIsCharacters(emp.lastName)) {error.lastName = "שם משפחה צריך להכיל אותיות בלבד";}
    if(error.IdPerson!==""||error.firstName!==""||error.lastName!==""||error.message!=="")
    {
        console.log("id is empty" + req.body.Id);
        res.render('SendPersonalMessage', {
            error: error,
            pageTitle: 'Send Personal Message',
            path: '/admin/SendPersonalMessage',
        });
    }
    //--------------------else------------------------------------------
    else {
        db.addEmployees.findOne({
            where: {id: req.body.Id},
        }).then(prod => {
            if(prod){
                let  date = new Date();
                emp={
                    IdPerson: req.body.Id,
                    message:req.body.contantMessage,
                    dateSend: date
                };

                db.sendPersonalMessage.create(emp);
            }
        }).catch((err) => {
            console.log(err)
        });
        res.render('theMessageHasBeenSent', {
            pageTitle: 'save message',
            path: '/admin/theMessageHasBeenSent',
        });
    }
};
//----------------------------------*********************************************
exports.postSaveWriterHours = (req, res, next) => {
    let emp1 = {
        day: 1,
        numCashier: req.body.numCashier[0],
        numMainCashier: req.body.numMainCashier[0],
        eveningNumCashier: req.body.eveningNumCashier[0],
        eveningNumMainCashier: req.body.eveningNumMainCashier[0],
        fridom: req.body.freedomA[0],
        freedomB: req.body.freedomB[0],
    };
    let emp2 = {
        day: 2,
        numCashier: req.body.numCashier[1],
        numMainCashier: req.body.numMainCashier[1],
        eveningNumCashier: req.body.eveningNumCashier[1],
        eveningNumMainCashier: req.body.eveningNumMainCashier[1],
        fridom: req.body.freedomA[1],
        freedomB: req.body.freedomB[1],
    };
    let emp3 = {
        day: 3,
        numCashier: req.body.numCashier[2],
        numMainCashier: req.body.numMainCashier[2],
        eveningNumCashier: req.body.eveningNumCashier[2],
        eveningNumMainCashier: req.body.eveningNumMainCashier[2],
        fridom: req.body.freedomA[2],
        freedomB: req.body.freedomB[2],
    };
    let emp4 = {
        day: 4,
        numCashier: req.body.numCashier[3],
        numMainCashier: req.body.numMainCashier[3],
        eveningNumCashier: req.body.eveningNumCashier[3],
        eveningNumMainCashier: req.body.eveningNumMainCashier[3],
        fridom: req.body.freedomA[3],
        freedomB: req.body.freedomB[3],
    };
    let emp5 = {
        day: 5,
        numCashier: req.body.numCashier[4],
        numMainCashier: req.body.numMainCashier[4],
        eveningNumCashier: req.body.eveningNumCashier[4],
        eveningNumMainCashier: req.body.eveningNumMainCashier[4],
        fridom: req.body.freedomA[4],
        freedomB: req.body.freedomB[4],
    };
    let emp6 = {
        day: 6,
        numCashier: req.body.numCashier[5],
        numMainCashier: req.body.numMainCashier[5],
        eveningNumCashier: req.body.eveningNumCashier[5],
        eveningNumMainCashier: req.body.eveningNumMainCashier[5],
        fridom: req.body.freedomA[5],
        freedomB: req.body.freedomB[5],
    };
    let emp7 = {
        day: 7,
        numCashier: req.body.numCashier[6],
        numMainCashier: req.body.numMainCashier[6],
        eveningNumCashier: req.body.eveningNumCashier[6],
        eveningNumMainCashier: req.body.eveningNumMainCashier[6],
        fridom: req.body.freedomA[6],
        freedomB: req.body.freedomB[6],

    };
    //-------------------------------------------------------------------------------


    db.Week.destroy({
        where: {},
        truncate: true
    });
    db.Week.create(emp1);
    db.Week.create(emp2);
    db.Week.create(emp3);
    db.Week.create(emp4);
    db.Week.create(emp5);
    db.Week.create(emp6);
    db.Week.create(emp7);


    let respWork, respEm;
    db.inlayWorks.findAll({
        where: {},
    }).then(function (prod) {
        if (prod != null) {
            respWork = prod;
            db.addEmployees.findAll({
                where: {},
            }).then(function (prod) {
                if (prod != null) {
                    respEm = prod;
                    res.render('workOrganiser', {
                        pageTitle: 'save employee',
                        path: '/admin/workOrganiser',
                        data: JSON.stringify(respWork),
                        dataE: JSON.stringify(respEm)
                    })
                }
            })
        }
    });
};

exports.postSaveEmployeeRequest = (req, res, next) => {
    let emp={
        idEmp:req.session.userName,
        requestContent:req.body.content,
        levelUngency:req.body.Gender,
    };
    let error={requestContent:"",levelUngency:""};
    //-----------check Is empty-----------------------------------
    if(checkIsempty(emp.requestContent)) {error.requestContent = "מלא בקשה לסדרן עבודה";}
    if(checkIsempty(emp.levelUngency)) {error.levelUngency = "בחר רמת דחיפות";}
    //-------------------------------------------------------------------------------
    if((error.requestContent!=="")||(error.levelUngency!==""))
    {
        res.render('sendPersonalMessageToChangeCalendar', {
            error: error,
            pageTitle: 'send Personal Message  to Change Calendar',
            path: '/admin/sendPersonalMessageToChangeCalendar',
        });
    }
    else {
        db.finishInlay.findAll({
            where: {idEmp: req.session.userName},
        }).then(function (prod) {
            db.employeeRequests.create(emp);   //message
            db.addEmployees.findOne({where: {id: req.session.userName},})
                .then(emp => {
                    res.render('CashierEntry', {
                        pageTitle: 'Cashier Entry',
                        path: '/admin/CashierEntry',
                        name: emp.firstName + " " + emp.lastName,
                        data: JSON.stringify(prod)
                    });
                });
        });
    }

};

exports.getWatchingEmployees = (req,res,next)=>
{
    db.addEmployees.findAll()
        .then(function(response) {
            res.render('watchingEmployees', {
                pageTitle: 'watching employee',
                path: '/admin/watchingEmployees',
                data: JSON.stringify(response)
            });

        })
        .catch((err) => {
            res.send({error:err});
            console.log('error', JSON.stringify(err))
        });
};



exports.postScheduling = (req, res, next) => {
    let shift = 1;
    if (req.body.shift =="משמרת ערב")
        shift=2;
    let error = {idEmp: "", date: "", inlayType: "",family:""};
    db.addEmployees.findOne({
        where: {firstName: req.body.name, lastName: req.body.family},
    }).then(prod => {
        if (prod !== null) {
            db.addEmployees.findOne({
                where: {id: prod.id},
            }).then(prod => {
                let emp = {
                    idEmp:prod.id,
                    day: translateDay(req.body.date),
                    levelOfInq: 1,
                    inlayType: shift,
                    prefer: 1

                };
                /* if (checkLength(req.body.name)) {
                     error.idEmp = "שם פרטי חייב להכיל יותר מ 2 אותיות";
                 }*/
                //-----------check Is empty-----------------------------------
                if (checkIsempty(emp.day)) {
                    error.date = "בחר יום";
                }
                if (checkIsempty(req.body.state)) {
                    error.inlayType = "בחר משמרת";
                }
                //------------------------------------------------------
                if ((error.idEmp !== "") || (error.date !== "")) {
                    res.render('inlayWorking', {
                        error: error,
                        pageTitle: 'inlay working',
                        path: '/admin/postInlayWorking',
                    });
                } else {
                    db.inlayWorks.create(emp);
                    res.render('theInlayWasSuccessful', {
                        pageTitle: 'the Inlay Was Successful',
                        path: '/inlayWorking/theInlayWasSuccessful',
//        data: JSON.stringify(week),
                    });
                }
            })
        } else {
            db.addEmployees.findOne({
                where: {id: req.body.Id},
            }).then(prod => {
                let emp = {
                    idEmp: req.body.Id,
                    day: translateDay(req.body.date),
                    levelOfInq: 1,
                    inlayType: shift,
                    prefer: 1

                };

                if (checkLength(emp.idEmp, 9)) {
                    error.idEmp = "תעודת זהות חייב להכיל 9 ספרות";
                }
                //-----------check Is empty-----------------------------------
                if (checkIsempty(emp.day)) {
                    error.date = "בחר יום";
                }
                if (checkIsempty(emp.idEmp)) {
                    error.idEmp = "עליך להזין תעודת זהות או שם פרטי ושם משפחה";
                }
                if (checkIsempty(req.body.state)) {
                    error.inlayType = "בחר משמרת";
                }
                //------------------------------------------------------
                if (checkIsDigit(emp.idEmp)) {
                    error.idEmp = "תעודת זהות חייב להכיל ספרות בלבד";
                }
                if ((error.idEmp !== "") || (error.date !== "") || (error.family!= "") || (error.inlayType!= "")) {
                    res.render('inlayWorking', {
                        error: error,
                        pageTitle: 'inlay working',
                        path: '/admin/postInlayWorking',
                    });
                } else {
                    /*  let week;
                      let today = new Date();
                      db.Week.findAll({
                          where: {date: today.getDate()},
                      }).then(function (prod) {
                          if (prod != null) {
                              week = prod.startTime;
                          }
                      });*/
                    db.inlayWorks.create(emp);
                    res.render('theInlayWasSuccessful', {
                        pageTitle: 'the Inlay Was Successful',
                        path: '/inlayWorking/theInlayWasSuccessful',
//        data: JSON.stringify(week),
                    });
                }
            }).catch()

        }
    })

};
//-----------------------change data--------------------------------------
exports.postDeleteMessage = (req,res,next)=>            //dont working
{
    let emp =  req.body.emp;
    db.addEmployess.findOne({
        where: {id: emp.id},
    }).then(prod => {
        prod.destroy();
    }).catch((err) => {
        console.log(err);
    });

    res.render('SendPersonalMessage', {
        pageTitle: 'Send Personal Message',
        path: 'admin/SendPersonalMessage',
        error:{id:"",firstName:"",lastName:"",contantMessage:""},
    })
};

exports.postChangeEmployee = (req,res,next)=>
{
    let emp =  req.body.emp;
    db.addEmployees.update(emp,{where:{id:emp.id}});
    return res.end();
};

exports.postDeleteEmployee = (req,res,next)=>
{
    let emp =  req.body.emp;
    return db.addEmployees.findOne({
        where: {id: emp.id},
    }).then(prod => {
        db.passwordLogin.findOne({
            where:{id:emp.id},})
            .then(prod2=>{
                db.inlayWorks.findOne({where:{id:emp.id},}).then(inlay=>{
                    prod.destroy();
                    prod2.destroy();
                    inlay.destroy();
                    res.json({ok: 1});
                }).catch((err)=>{console.log(err);})
            }).catch((err) => {
            console.log(err);});
    }).catch((err) => {
        console.log(err);});
    return res.end();
};

exports.postDeleteMessageOrganizere = (req, res, next) => {
    db.employeeRequests.findOne({
        where: {idEmp: req.body.emp.id},
    }).then(prod => {
        if (prod) {
            prod.destroy();
            res.render('SendPersonalMessage', {
                pageTitle: 'Send Personal Message',
                path: '/SendPersonalMessage',
                empl: JSON.stringify(req.body.emp.id),
                error: {idPerson: "", firstName: "", lastName: "", message: ""},
            });
        }
    });

};




exports.postSaveDate = (req,res,next)=>
{
    let error = {inlayType: "", levelOfInq: ""};
    let counter = 0;
    let evening1={
        day:'Sun',
        idEmp:req.session.userName,
        levelOfInq:checkLevelOfInq(req.body.evening[0]),
        inlayType: 2,
        prefer: 0

    };
    let evening2={
        day:'Mon',
        idEmp:req.session.userName,
        levelOfInq:checkLevelOfInq(req.body.evening[1]),
        inlayType: 2,
        prefer: 0
    };
    let evening3={
        day:'Tue',
        idEmp:req.session.userName,
        levelOfInq:checkLevelOfInq(req.body.evening[2]),
        inlayType: 2,
        prefer: 0
    };
    let evening4={
        day:'Wed',
        idEmp:req.session.userName,
        levelOfInq:checkLevelOfInq(req.body.evening[3]),
        inlayType: 2,
        prefer: 0
    };
    let evening5={
        day:'Thu',
        idEmp:req.session.userName,
        levelOfInq:checkLevelOfInq(req.body.evening[4]),
        inlayType: 2,
        prefer: 0
    };
    let evening7={
        day:'Sat',
        idEmp:req.session.userName,
        levelOfInq:checkLevelOfInq(req.body.evening[5]),
        inlayType: 2,
        prefer: 0
    };
    let emp1={
        day:'Sun',
        idEmp:req.session.userName,
        levelOfInq:checkLevelOfInq(req.body.morning[0]),
        inlayType: 1,
        prefer: 0

    };
    let emp2={
        day:'Mon',
        idEmp:req.session.userName,
        levelOfInq:checkLevelOfInq(req.body.morning[1]),
        inlayType: 1,
        prefer: 0
    };
    let emp3={
        day:'Tue',
        idEmp:req.session.userName,
        levelOfInq:checkLevelOfInq(req.body.morning[2]),
        inlayType: 1,
        prefer: 0
    };
    let emp4={
        day:'Wed',
        idEmp:req.session.userName,
        levelOfInq:checkLevelOfInq(req.body.morning[3]),
        inlayType: 1,
        prefer: 0
    };
    let emp5={
        day:'Thu',
        idEmp:req.session.userName,
        levelOfInq:checkLevelOfInq(req.body.morning[4]),
        inlayType: 1,
        prefer: 0
    };
    let emp6={
        day:'Fri',
        idEmp:req.session.userName,
        levelOfInq:checkLevelOfInq(req.body.morning[5]),
        inlayType: 1,
        prefer: 0
    };
    for(var i =0 ; i < req.body.morning.length; i++) {if(req.body.morning[i] == "יכול") counter++;}
    for(var i =0 ; i < req.body.evening.length; i++) {if(req.body.evening[i] == "יכול") counter++;}
    if(counter == 0) {error.levelOfInq = "בחר משמרת אחת לפחות כיכול לעבוד"}
     if (counter > 6) {error.levelOfInq = "אין אפשרות לעבוד יותר מ 6 משמרות"}
     if((emp1.levelOfInq == 1 && evening1.levelOfInq == 1) || (emp2.levelOfInq == 1 && evening2.levelOfInq == 1) || (emp3.levelOfInq == 1 && evening3.levelOfInq == 1) || (emp4.levelOfInq == 1 && evening4.levelOfInq == 1) || (emp5.levelOfInq == 1 && evening5.levelOfInq == 1))
         error.inlayType = "אין אפשרות לעבוד ביום אחד בשני משמרות";
     if ((error.levelOfInq !== "") || (error.inlayType != "")) {
         res.render('setUpInquiries', {
             pageTitle: 'set Up Inquiries',
             path: '/admin/setUpInquiries',
             error: error
     });
     }
     else{
         db.inlayWorks.destroy({
             where: {idEmp:req.session.userName},
         });

         if (emp1.levelOfInq != 4) {
             db.inlayWorks.create(emp1);
         }
         if (emp2.levelOfInq != 4)
             db.inlayWorks.create(emp2);
         if (emp3.levelOfInq != 4)
             db.inlayWorks.create(emp3);
         if (emp4.levelOfInq != 4)
             db.inlayWorks.create(emp4);
         if (emp5.levelOfInq != 4)
             db.inlayWorks.create(emp5);
         if (emp6.levelOfInq != 4)
             db.inlayWorks.create(emp6);
         if (evening1.levelOfInq != 4)
             db.inlayWorks.create(evening1);
         if (evening2.levelOfInq != 4)
             db.inlayWorks.create(evening2);
         if (evening3.levelOfInq != 4)
             db.inlayWorks.create(evening3);
         if (evening4.levelOfInq != 4)
             db.inlayWorks.create(evening4);
         if (evening5.levelOfInq != 4)
             db.inlayWorks.create(evening5);
         if (evening7.levelOfInq != 4)
             db.inlayWorks.create(evening7);
         db.finishInlay.findAll({
             where: {idEmp: req.session.userName},
         }).then(function (prod) {
             db.addEmployees.findOne({where: {id: req.session.userName},})
                 .then(emp => {
                     res.render('CashierEntry', {
                         pageTitle: 'Cashier Entry',
                         path: '/admin/CashierEntry',
                         name: emp.firstName + " " + emp.lastName,
                         data: JSON.stringify(prod),
                     });
                 });
         });
     }
};


//--------------------------function---------------------------------------
let checkIsempty=function( str)
{
    if((str==="")|| str==="בחר" || str===undefined)
        return true;
    return false;
};

let checkLength=function( str,length)
{
    if(str.length===length)
        return false;
    return true;
};

let checkIsDigit=function (str) {
    return isNaN(str);
};
let checkIsCharacters=function (str) {
    var filter = /^[A-Za-z]+$/;
    var hebrew = str.search(/[\u0590-\u05FF]/);
    if(filter.test(str)||str==="" || hebrew >= 0)
        return false;
    return true;
};
let checkEmail = function(str){
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if(!filter.test(str))
        return true;
    return false;
};
let checkLevelOfInq = function(str){
   if(str == "יכול")
       return 1;
   else if(str == "מעדיף שלא")
       return 3;
   else if(str == "בחר")
       return 4;
   else if(str == "לא יכול")  return 2;
};

function translateDay(value){
    if(value == "ראשון")
        return "Sun";
    if(value == "שני")
        return "Mon";
    if(value == "שלישי")
        return "Tue";
    if(value == "רביעי")
        return "Wed";
    if(value == "חמישי")
        return "Thu";
    if(value == "שישי")
        return "Fri";
    if(value =="שבת")
        return "Sat";
}