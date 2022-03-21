const jws = require("jws");

const {ValidationError} = require('objection');
const bcrypt = require('bcrypt');
const {reject} = require("bcrypt/promises");
const crypto = require("crypto-js");
const tokenModel = require('../objection/modelToken')
const saltRounds = 12;
const _regexMail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const _regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
require('dotenv').config()



const jwtDuration = process.env.JWT_DURATION || 1800;
const jwtAlg = process.env.JWT_ALG;
const jwtSecret = process.env.JWT_SECRET;
const jwtDuration2 = process.env.JWT_DURATION2 || 3600;

const generateToken = ({sub}) => {
    try {
        const iat = Math.floor(new Date().getTime() / 1000);
        const exp = iat + parseInt(jwtDuration);
        return jws.sign(
            {
                header: {alg: jwtAlg, typ: 'JWT'},
                payload: JSON.stringify({sub, iat, exp}),
                secret: jwtSecret,
            }
        )
    }catch (err){
        console.log(err)
        throw err
    }
}

const generateRefreshToken = ({sub}) => {
    try {
        const iat = Math.floor(new Date().getTime() / 1000);
        const exp = iat + parseInt(jwtDuration2);
        return jws.sign(
            {
                header: {alg: jwtAlg, typ: 'JWT'},
                payload: JSON.stringify({sub, iat, exp}),
                secret: jwtSecret,
            }
        )
    }catch (err){
        console.log(err)
        throw err
    }
}

const validationMail = (mail) => {
    if (_regexMail.test(mail)) return false;
    return ({
        "message": "username: must be null type",
        "code": "VALIDATION Email",
        "data": [{
            "message": "must be null type",
            "Keyword": "regular"
        }]
    })
}
const validationPass = (pass) => {
    if (_regexPass.test(pass)) return false;
    return ({
        "message": 'Minimum 8 and maximum 20 characters, at least one uppercase letter, one lowercase letter, one number and one special character:',
        "code": "VALIDATION",
        "data": [{
            "message": "Minimum 8 and maximum 20 characters, at least one uppercase letter, one lowercase letter, one number and one special character:",
            "Keyword": "regular"
        }]
    })
}

const hasPassword = (pass) => new Promise((resolve, reject)=>{
    bcrypt.hash(pass, saltRounds,function (err,hash){
        if(err) return reject(err);
        return  resolve(hash)
    })
})
const comparePassword = (pass, hash)=> new Promise((resolve ,reject)=>{
    bcrypt.compare(pass, hash, function(err, result) {console.log(result);
        if(err) return reject(err);
        return  resolve(result);
    });
})

const compareJWT = (jwt) => {
    try {
        const verify = jws.verify(jwt, jwtAlg, jwtSecret); // true or false
        if(!verify) throw {
            "message": "Json web token invalid",
            "type": "jwt",
            "code": "JWT_INVALID"
        }
        const data = jws.decode(jwt) // giai ma
        const iat = Math.round( new Date().getTime() / 1000);
        if((data.payload.exp - iat) <= 0) throw {
            "message": "JSON web token expired",
            "type": "jwt",
            "code": "JWT_EXPIRED",
        }
        return data.payload;
    }
    catch (err) {
        if(err.code !== "ERR_INVALID_ARG_TYPE") throw err
        throw{
            "Message": "JWT invalid",
            "type": "jwt",
            "code": "Invalid jwt",
        }
    }
}

const compareRefreshToken = (uidToken) => {
    const tokenExist = tokenModel.query().findOne(uidToken) ;
    if(!tokenExist) throw {
        "Message": "UID Exist",
        "code": "UID Exist"
    }
    const revok = tokenExist.is_revoke
    if(revok === true) throw {
        "Message": "UID Exist",
        "code": "UID Exist"
    }
    return tokenExist
}

const encode = ({sub}) => {
    try {
        return crypto.AES.encrypt(sub, jwtSecret).toString();
    }catch (err){
        console.log(err)
    }
}

const decode = ({refresh}) => {
    try {
        const bytes = crypto.AES.decrypt(refresh, jwtSecret);
        return bytes.toString(crypto.enc.Utf8);
    }
    catch (err) {
        console.error(err);
    }
}
module.exports = {
    validationMail,
    validationPass,
    hasPassword,
    comparePassword,
    compareJWT,
    generateToken,
    generateRefreshToken,
    encode,
    decode,
    compareRefreshToken
}