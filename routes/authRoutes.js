const express = require('express');
const mongoose = require('mongoose');
const modelName = require('../models/modelName');
const jwt = require('jsonwebtoken');

const User = mongoose.model(modelName.USERS);

const router = express.Router();

router.post('/signup', (req,res) => {

    const { email, password } = req.body;
    console.log(password);
    try{

        const user = new User();
        
        user.email =  email;
        user.setPassword(password);
        console.log("FINAL => " + user.password);
        user.save((err, User) => { 
            if (err) { 
                return res.status(400).send({ 
                    message : "Failed to add user: " + err
                }); 
            } 
            else { 

                const token = jwt.sign({userId : user._id}, "MY_SECRET_GOES_HERE");

                res.send({ token });
            } 
        });
        
    }catch(err){
        return res.status(422).send("Error saving: " + err.message);
    }
    
});

router.post('/signin', async (req, res) => {

    const { email, password } = req.body;

    User.findOne({email}, (err, user) => {

        if(err){
            return res.status(422).send({error : "There were a problem: " + err});
        }

        if(!user){
            return res.status(422).send({error : "Invalid password or email"});
        }

        if(user.validatePassword(password)){

            const token = jwt.sign({userId : user._id}, "MY_SECRET_GOES_HERE");
            res.send({token});

        }else{
            res.status(422).send({error : "Invalid password or email"});
        }




    });


});

module.exports = router;