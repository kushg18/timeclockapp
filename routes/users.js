const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user');
const Activity = require('../models/activity');
const config = require('../config/database');


// Register
router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        permission: req.body.permission
    });

    User.addUser(newUser, (err, user) => {
        if(err){
            res.json({success: false, msg: 'Failed to register user'});
        }else{
            res.json({success: true, msg: 'User Registered'});
        }
    });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    User.getUserByUsername(username, (err, user) => {
        if(err) throw err;
        if(!user){
            return res.json({success: false, msg: 'User not found'});
        }
        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 604800 // 1 week in seconds
                });
                res.json({
                    success: true,
                    token: 'JWT '+token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email,
                        permission: user.permission
                    }
                });
            }else{
                return res.json({success: false, msg: 'Wrong Password'});
            }
        });
    });
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    // console.log("Getting Profile");
    res.json({
        user: req.user
    });
});

// Add Activity
router.post('/activity', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    // console.log("Adding Activity");
    let newActivity = new Activity({
        userId: req.body.userId,
        activityType: req.body.activityType,
        date: req.body.date,
        time: req.body.time
    });
    // console.log(newActivity);
    Activity.addActivity(newActivity, (err, activity) => {
        if(err){
            // res.send(err);
            res.json({success: false, msg: 'Failed to add user activity'});
        }else{
            res.json({success: true, msg: 'Added user activity'});
        }
    });
}); 
 
// Get All Activities
router.get('/activity/:userId', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    // console.log("Getting Activity");
    var userId = req.params.userId;
    Activity.getActivitiesByUserId(userId, (err, activity) => {
        if(err){
            res.json({success: false, msg: 'Failed to get user activity'});
        }else{
            res.json(activity);
        }
    });
});

// Get All Users
router.get('/', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    // console.log("Getting All Users");
    User.getAllUsers((err, users) => {
        if(err){
            res.json({success: false, msg: 'Failed to get all users'});
        }else{
            res.json(users);
        }
    });
});

module.exports = router;