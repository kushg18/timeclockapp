const mongoose = require('mongoose');
let ObjectId = mongoose.Schema.Types.ObjectId;
const bcrypt = require('bcryptjs');
const config = require('../config/database'); 

// Activity Schema
const ActivitySchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    activityType:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    time:{
        type: String,
        required: true
    }
});

const Activity = module.exports = mongoose.model('Activity', ActivitySchema);

module.exports.addActivity = function(newActivity, callback){
    newActivity.save(callback);
}

module.exports.getActivitiesByUserId = function(userId, callback){
    Activity.find({userId: userId}, callback);
}
