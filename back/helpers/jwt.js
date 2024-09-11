'use strict'
var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'hectorlopez';

exports.createToken  = function(user){
    var payload = {
        sub:user.id,
        nombres:user.nombres,
        apellidos:user.apellidos,
        email:user.email,
        iat: moment().unix(),
        exp: moment().add(7,'days'),
    }

    return jwt.encode(payload,secret);
    
}