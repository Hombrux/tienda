'use strict'
const cliente = require('../models/cliente');
var Cliente = require('../models/cliente');
var bycript = require('bcrypt-nodejs');


const registro_cliente= async function(req,res){
    //
    var data = req.body;
    var clientes_arr = [];

    clientes_arr = await Cliente.find({email:data.email});

    if(clientes_arr.length == 0){
        //REGISTRO
        
        if(data.password){
            bycript.hash(data.password,null,null, async function(err,hash){
                if(hash){
                    data.password = hash;
                    var reg = await Cliente.create(data);
                    res.status(200).send({data:reg});
                }else{
                    res.status(200).send({message:'ErrorServer',data:undefined});   
                }
            });
        }else{
            res.status(200).send({message:'No hay contraseña',data:undefined});     
        }   
    }else{
        res.status(200).send({message:'El correo ya existe',data:undefined}); 
    }
    
}

const login_cliente = async function(req,res){
    var data = req.body;
    var cliente_arr = [];
    cliente_arr = await Cliente.find({email:data.email});

    if(cliente_arr.length == 0){
        res.status(200).send({message:"No se encontro el correo",data:undefined});
    }else{
        let user = cliente_arr[0];

        bycript.compare(data.password,user.password,async function(error,check){
            if(check){
                res.status(200).send({data:user});
            }else{
                res.status(200).send({message:"La contraseña no coincide",data:undefined});
            }
        })
    }
    
}

module.exports = {
    registro_cliente,
    login_cliente
}