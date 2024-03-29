const models = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
var uuid = require('uuid');
const Validator = require('fastest-validator');

 
const schema = {
    firstName: {type:"string", optional: true},
    lastName: {type: "string", optional: true},
    email: {type:"string", optional: false},
    password: {type: "string", optional: false},
    mobilePhone: {type: "number", optional: true},
}


function getObj(req){
    const obj = {
        id: req.body.id || uuid.v4(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email:req.body.email,
        password: req.body.password,
        mobilePhone:req.body.mobilePhone,
        status:req.body.status,
        verified:req.body.verified,
        token:req.body.token
    }     
    return obj;
}

function validateInput(obj,res){
    const v = new Validator();
    const validationResponse = v.validate(obj, schema);

    if(validationResponse !== true){
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    }
}


function signUp(req, res){
  
  validateInput(getObj(req),res);
   //Sign up
   models.User.findOne({where:{email:req.body.email}}).then(result => {
       if(result){
           res.status(409).json({
               message: "Email already exists!",
           });
       }else{
           bcryptjs.genSalt(10, function(err, salt){
               bcryptjs.hash(req.body.password, salt, function(err, hash){
                   const user = {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email:req.body.email,
                    password:hash,
                    mobilePhone:req.body.mobilePhone
                    };
                   models.User.create(user).then(result => {
                       res.status(201).json({
                           message: "User created successfully",
                       });
                   }).catch(error => {
                       res.status(500).json({
                           message: "Something went wrong!",
                           error: error
                       });
                   });
               });
           });
       }


   }).catch(error => {
       res.status(500).json({
           message: "Something went wrong!",
           error: error
       });
   });
}
 

function login(req, res){
   models.User.findOne({where:{email: req.body.email},
       include:[{
           model: models.Rule,
           attributes: ['ruleName'] 
       }],    
     }
       ).then(user => { 
       if(user === null){
           res.status(401).json({
               message: "Invalid credentials!",
           });
       }else{
           bcryptjs.compare(req.body.password, user.password, function(err, result){
               if(result){

                    const userRules = []; 
                    user.Rules.forEach(e => {
                        userRules.push(e.ruleName)
                    });
                     
                   const token = jwt.sign({
                       email: user.email,
                       userId: user.id,
                       rules : userRules,
                   }, process.env.JWT_KEY, function(err, token){
                       res.status(200).json({
                           message: "Authentication successful!",
                           token: token
                       });
                   });
               }else{
                   res.status(401).json({
                       message: "Invalid credentials!",
                   });
               }
           });
       }
   }).catch(error => {
       res.status(500).json({
           message: "Something went wrong!",
       });
   });
}

function getUserRules(req,res){

    models.User.findOne({
        include: [
            {
                model: models.Rule,
                attributes: ['ruleName']       
            },
           
        ],
        where: {
            id: req.params.id,
        },
        attributes: ['id',"email"],


    }).then(result => {
      
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong!",
            error: error
        });
    });

}



function index(req, res){
    models.User.findAll().then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong!",
            error: error
        });
    });
}

function authUser(req,res){ 
    models.User.findAll().then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong!",
            error: error
        });
    });        
}


module.exports = {
   signUp: signUp,
   login: login,
   index: index,
   getUserRules:getUserRules,
   authUser: authUser,
}

