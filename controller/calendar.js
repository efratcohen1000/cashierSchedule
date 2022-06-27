var Sequelize = require('sequelize');


const dbModels = require('../models');

exports.getCalendar = (req, res, next) => {
    console.log("i am in getCalendar");

    dbModels.calendar.findAll({
        where: {title: 'some product'},
    }).then(prod => {
        prod.destroy(); res.render('/workOrganiser', {data: prod})
    }).catch (errors);
};

