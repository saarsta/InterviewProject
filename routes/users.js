var express = require('express');
var router = express.Router();
var users = require('../model/users.js');
var fsActinos = require('../infra/fsactions.js');

router.get('/:id', function (req, res, next) {
    users.findById(req.params.id, function (err, user) {
        if (err)
            return next(err);
        res.render('user', {user: user});
    });
});

router.post('/', function (req, res, next) {
    var user = {};

    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.headline = req.body.headline;
    user.email = req.body.emailAddress;
    user.linkedinId = req.body.id;

    users.findOne({'linkedinId': user.linkedinId}, function (err, existUser) {
        if (err)
            return next(err);
        if(existUser)
            return res.send(existUser);

        users.create(user, function (err, newUser) {
            if (err)
                return next(err);
            // add user to csv file
            var csvRow = [user.firstName, user.lastName, user.headline, user.email];
            csvRow = csvRow
                .map(c => (c || "").replace(/"/g,'""'))
                .map(c => '"' + c + '"').join(',');
            csvRow += '\n';

            fsActinos.addRowToCsvFile(csvRow, function (err) {
                if (err)
                    return next(err);
                res.send(newUser);
            });
        });
    });
});

module.exports = router;
