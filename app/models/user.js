// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({
    resetPasswordToken: {type: String},
    resetPasswordExpires: {type: Date},
    local: {
        email: {
            type: String,
            unique: true,
            // required: true
        },
        password: {
            type: String,
            // required: true
        },
    },
    google: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    profile: {
        firstName: {type: String},
        lastName: {type: String}
    },
    role: {
        type: String,
        enum: ['Member', 'Client', 'Owner', 'Admin'],
        default: 'Member'
    },
}, {
    timestamps: true
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
