/**
 * Created by Shiri on 9/9/2017.
 */

//Require Mongoose
var mongoose = require('mongoose');

// Define schema
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstName: String,
    lastName: String,
    headline: String,
    linkedinId: String,
    email: String,
    updated: {type: Date, default: Date.now}
});

// Compile model from schema
module.exports = mongoose.model('Users', UserSchema);
