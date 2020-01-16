const express = require('express');
const mongoose = require('mongoose');
const modelName = require('../models/modelName');
const jwt = require('jsonwebtoken');

const User = mongoose.model(modelName.USERS);

const router = express.Router();

router.post('/signup', (req,res) => {

    const { email, password } = req.body;
    
    try{

        const user = new User();
        
        user.email =  email;
        user.setPassword(password);

        user.save((err, User) => { 
            if (err) { 
                return res.status(400).send({ 
                    error : "Failed to add user: " + err.message
                }); 
            } 
            else { 

                const token = jwt.sign({userId : user._id}, "MY_SECRET_GOES_HERE");

                res.send({ token });
            } 
        });
        
    }catch(err){
        return res.status(422).send({error : "Error saving: " + err.message });
    }
    
});

router.post('/signin', async (req, res) => {
    
    const { email, password } = req.body;
    
    if(!email){
        return res.status(422).send({error : "Invalid password or email"});
    }
    
    User.findOne({email}, (err, user) => {
        
        if(err){
            return res.status(422).send({error : "There were a problem: " + err});
        }

        if(!password){
            return res.status(422).send({error : "Please, specify your password"});
        }
        
        if(user.validatePassword(password)){

            const token = jwt.sign({userId : user._id}, "MY_SECRET_GOES_HERE");
            res.send({token});

        }else{
            res.status(422).send({error : "Invalid email or password"});
        }




    });


});

module.exports = router;