const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const modelName = require('../models/modelName');
const User = mongoose.model(modelName.USERS);

module.exports = (req, res, next) => {

    const { authorization } = req.headers;

    const token = authorization.replace('Bearer ', "");

    jwt.verify(token, "MY_SECRET_GOES_HERE", async (err, payload) => {

        if(err)
            return res.status(401).send({ error : "You must be logged in!" });

        const { userId } = payload;

        const user = await User.findById(userId);

        req.user = user;
        next();
    });

}