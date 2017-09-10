/**
 * Created by Shiri on 9/9/2017.
 */
var fs = require('fs');


exports.addRowToCsvFile = function (row, cb) {
    fs.appendFile('users.csv', row, function (err) {
        if (err)
            return cb(err);
        console.log('Saved!');
    })
};
