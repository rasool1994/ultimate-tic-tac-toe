// load the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// define the schema for our OnlineGameQueue model
var onlineGameQueueSchema = mongoose.Schema({
    player_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    channel: {
        type: String
    }
}, {
    timestamps: true
});

// create the model for OnlineGameQueue and expose it to our app
module.exports = mongoose.model('OnlineGameQueue', onlineGameQueueSchema);
