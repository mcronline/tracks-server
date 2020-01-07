const mongoose = require('mongoose');
const modelName = require('./modelName');
const crypto = require('crypto');

const userSchema = mongoose.Schema({
    email : {
        type : String,
        unique: true,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    salt : {
        type : String,
        required : true
    }
});

userSchema.methods.setPassword = function(password){
    const user = this;

    user.salt = crypto.randomBytes(16);
    
    user.password = crypto.pbkdf2Sync(password, user.salt, 10, 64, 'sha512').toString('hex');
    

}

userSchema.methods.validatePassword = function(password){
    const user = this;
    
    hashedPassword = crypto.pbkdf2Sync(password, user.salt, 10, 64, 'sha512').toString('hex');
    
    return user.password === hashedPassword;

}

mongoose.model(modelName.USERS, userSchema);