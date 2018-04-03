// load the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// define the schema for our OnlineGame model
var onlineGameSchema = mongoose.Schema({
    channel: {
        type: String,
        required: true
    },
    player1: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    player2: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

// create the model for users and expose it to our app
module.exports = mongoose.model('OnlineGame', onlineGameSchema);
