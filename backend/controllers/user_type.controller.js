const models = require('../models');
const Validator = require('fastest-validator');
var uuid = require('uuid');
 
const schema = {
    type: {type:"string", optional: false},
   
}

function getObj(req){


    const obj = {
        type: req.body.type, 
        id: req.body.id || uuid.v4()    
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

//only need to change the Model Name
function index(req, res){
    models.User_Type.findAll().then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong!",
            error: error
        });
    });
}

//only need to change the Model Name
function show(req, res){
    const id = req.params.id;

    models.User_Type.findByPk(id).then(result => {
        if(result){
            res.status(200).json(result);
        }else{
            res.status(404).json({
                message: "Usre_Type not found!"
            }) 
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong!"
        })
    });
}


// 1 modification 
function add(req, res){

   
    const obj = getObj(req);  

    validateInput(obj,res);
    // Change 1
    models.User_Type.create(obj).then(result => {
        res.status(201).json({
            message: "User_Type created successfully",
            obj: result
        });
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}
// 1 modification 
function update(req, res){

    const id = req.params.id;
    const obj = getObj(req); 

    validateInput(obj,res);

    // Change 1
    models.User_Type.update(obj, {where: {id:id}}).then(result => {
        res.status(200).json({
            message: "User_Type updated successfully",
            obj: obj
        });
    }).catch(error => {
        res.status(200).json({
            message: "Something went wrong",
            error: error
        });
    })
}

function destroy(req, res){
   const id = req.params.id;


    models.User_Type.destroy({where:{id:id}}).then(result => {
        res.status(200).json({
            message: "User_Type deleted successfully"
        });
    }).catch(error => {
        res.status(200).json({
            message: "Something went wrong",
            error: error
        });
    });
 }
 
 

module.exports = {
    index: index,
    show: show,
    add: add,
    update:update,
    destroy: destroy
}

