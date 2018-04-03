module.exports = function () {

    var express = require('express');
    var User = require('../app/models/user');
    var jwt = require('jsonwebtoken');
    var config = require('../env');
    var passport = require('passport');
    var OnlineGameQueue = require('../app/models/online-game-queue');
    var OnlineGame = require('../app/models/online-game');

    var router = express.Router();

    //=================================
    // API ROUTES  ====================
    //=================================

    router.post('/signup', function (req, res) {

        // get user email and password from request body
        var email = req.body.email;
        var password = req.body.password;

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to signup already exists
        User.findOne({'local.email': email}, function (err, user) {

            var newUser = new User();

            // if there are any errors, return the error
            if (err) {
                res.json({success: false, message: 'there is a problem!plz try later.'});
            }

            // check to see if there is already a user with that email
            if (user) {
                return res.json({success: false, message: 'That email is already have been signed up.'});
            } else {

                // if there is no user with that email
                // create the user

                // set the user's local credentials
                newUser.local.email = email;
                newUser.local.password = newUser.generateHash(password);

                // save the user
                newUser.save(function (err) {
                    if (err)
                        return res.json({success: false, message: 'there is a problem!plz try later.'});
                });
            }

            // init jwt token payload
            const payload = {
                id: newUser._id
            };

            // create new accessToken
            var token = jwt.sign(payload, config.secret, {
                expiresIn: "10 days"
            });

            // set accessToken to cookie and return the information including token
            return res.cookie('accessToken', token, {maxAge: 9000000, httpOnly: true}).json({
                success: true,
                message: 'every things is right.Enjoy your token!',
                token: token
            });
        });
    });

    // route ot get new token = login : token will set in cookie to
    router.post('/get-token', function (req, res) {

        var email = req.body.email;
        var password = req.body.password;


        // find the user
        User.findOne({
            'local.email': email || ''
        }, function (err, user) {

            if (err) throw err;

            if (!user) {
                res.json({success: false, message: 'Authentication failed. User not found.'});
            } else if (user) {

                // check if password matches
                if (!user.validPassword(password || '')) {
                    res.json({success: false, message: 'Authentication failed. Wrong password.'});
                } else {

                    // if user is found and password is right
                    // create a token with only our given payload
                    // we don't want to pass in the entire user since that has the password

                    const payload = {
                        id: user._id
                    };

                    var token = jwt.sign(payload, config.secret, {
                        expiresIn: "10 days"
                    });

                    // return the information including token
                    res.cookie('accessToken', token, {maxAge: 9000000, httpOnly: true}).json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token
                    });
                }
            }
        });
    });

    // route middleware to verify jwt token and add user to res.locals.user
    router.use(function (req, res, next) {

        // check header or url parameters or post parameters for token
        var token = req.body.token || req.query.token || req.headers['Authorization'] || req.cookies.accessToken;

        // decode token
        if (token) {
            // verifies secret and checks exp
            jwt.verify(token, config.secret, function (err, decoded) {
                if (err)
                    return res.json({success: false, message: 'Failed to authenticate token.'});
                // if everything is good, save to request for use in other routes
                User.findById(decoded.id, function (err, user) {
                    // if there are any errors, return the error
                    if (err)
                        return err;
                    if (user) {
                        res.locals.user = user;
                        next();
                    } else {
                        return res.json({success: false, message: 'user not found.'});
                    }
                });
            });
        } else {
            // if there is no token
            // return an error
            return res.status(403).send({
                success: false,
                message: 'you must logged in for access.(no token provided)'
            });
        }
    });

    router.post('/start-online-game', function (req, res) {
        OnlineGameQueue.findOne({}, function (err, lastOnlinePlayRequest) {
            if (err)
                throw err;

            if (lastOnlinePlayRequest) {
                var onlineGame = new OnlineGame;
                onlineGame.channel = lastOnlinePlayRequest.channel;
                onlineGame.player1 = lastOnlinePlayRequest.player_id;
                onlineGame.player2 = res.locals.user._id;
                onlineGame.save(function (err) {
                    if (err)
                        throw err;
                    return res.json(
                        {
                            success: true,
                            message: 'make your first move',
                            channel: onlineGame.channel,
                            isSearchingForOpponent: false
                        }
                    );
                });
            } else {
                var newGameQueue = new OnlineGameQueue;
                newGameQueue.player_id = res.locals.user._id;
                newGameQueue.channel = res.locals.user._id;
                newGameQueue.save(function (err) {
                    if (err)
                        throw err;
                    return res.json({
                        success: true,
                        message: 'searching for opponent',
                        channel: newGameQueue.channel,
                        isSearchingForOpponent: true
                    });
                });
            }
        }).remove(function (err) {
            if (err)
                throw err;
        });
    });

    // route to show a random message (GET http://localhost:8080/api/)
    router.get('/', function (req, res) {
        res.json({message: 'Welcome to the coolest API on earth!'});
    });


    return router;
};
