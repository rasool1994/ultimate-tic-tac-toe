var config = require('../env').googleAuth;

// expose our config directly to our application using module.exports
module.exports = {
    'googleAuth': {
        'clientID': config.clientID,
        'clientSecret': config.clientSecret,
        'callbackURL': config.callbackURL
    }
};
