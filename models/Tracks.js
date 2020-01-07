const mongoose = require('mongoose');
const modelName = require('./modelName');

const pointSchema = new mongoose.Schema({
    timestamp : Number,
    coords : {
        latitude : Number,
        longitude : Number,
        altitude : Number,
        accuracy : Number,
        heading : Number,
        Speed : Number
    }
});

const trackSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    name : {
        type : String,
        default : ''
    },
    locations : [pointSchema]
});

mongoose.model(modelName.TRACKS, trackSchema);