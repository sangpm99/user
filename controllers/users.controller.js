const userModel = require('../objection/model');
const tokenModel = require('../objection/modelToken');
const {
    validationMail,
    validationPass,
    comparePassword,
    hasPassword,
    generateToken,
    compareJWT,
    generateRefreshToken,
    encode,
    decode, compareRefreshToken,

} = require("../ultil/check");
const { v4: uuidv4 } = require('uuid');
const jws = require('jws');
const crypto = require('crypto-js');

const users_get = async (req, res, next) => {
    try {
        await res.send('NOT IMPLEMENTED: Author list');
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};

const register = async (req, res, next) => {
    try {
        const {username, pass} = req.body;
        const checkMail = validationMail(username);
        if (checkMail) return res.status(422).send(
            checkMail
        )

        const userExist = await userModel.query().findOne({username});
        if(userExist) return res.status(422).send({
            "Message": "username already exist",
            "code": "validation",
            "data":{
                "username": [
                    {
                        "message": "username already exist, please use another username or login",
                        "keyword": "duplicate"
                    }
                ]
            }
        })
        const checkPass = validationPass(pass);

        if(checkPass) return res.status(422).send(checkPass);
        const hasPass = await hasPassword(pass);
        const uid = uuidv4();
        const newUser = {...req.body,uid,pass: hasPass}
        console.log(newUser)
        const data = await userModel.query().insert(newUser);

        const accessToken = generateToken({sub:uid});
        data.accessToken = accessToken;
        // const compare = compareJWT(accessToken);
        // console.log("compare : " + compare);
        const refeshToken = generateRefreshToken( {sub: uid});
        data.refreshToken = refeshToken;
        return res.send(data);
    } catch (err) {
        console.error(err);
    }
}

const login = async (req, res, next) =>{
    try{
        const {username, pass} = req.body;
        const checkMail = validationMail(username);
        if (checkMail) return res.status(422).send(
            checkMail
        )
        const userExist = await userModel.query().findOne({username});
        let userId;
        if(userExist) {
            userId = userExist.uid;
        }
        else return res.status(422).send({
            "Message": "Invalid account or password",
            "code": "validation",
            "data":{
                "username": [
                    {
                        "message": "Invalid account or password",
                        "keyword": "duplicate"
                    }
                ]
            }
        })
        const hasPass = await hasPassword(pass);
        const hashNew = await hasPassword(userExist.pass);
        const result = await comparePassword(pass, hashNew);

        const accessToken = generateToken({sub:userId});
        const data = {...req.body,pass: hasPass}
        data.pass = hasPass;
        data.accessToken = accessToken;
        // const compare = compareJWT(accessToken);
        // console.log("compare : " + compare);
        const uid = uuidv4();
        const refreshToken = encode({sub:uid});
        data.refreshToken = refreshToken;
        const refresh = {uid,user_id: userId, is_revoke: false}
        const data2 = await tokenModel.query().insert(refresh);
        return res.send(data)

        if(result) {
            return res.send(data);
        }
        else {
            res.send("Incorrect password")
        }

    }catch (err){
        console.error(err);
    }
}

const refreshToken = async (req, res, next) =>{
    try {
        const {refreshToken} = req.body; // lấy access token trên body
        const uidDecrypt = decode({refresh: refreshToken}); // decode lấy uid
        const verify = compareRefreshToken(uidDecrypt) // truy vấn  id có tồn tại chưa, và is_revoke có true k
        const newAccessToken = generateToken({sub:verify.user_id});  // tạo 1 access token mới dựa trên id đó
        return res.send({accessToken: newAccessToken}) // gửi về access token

    }catch (err){
        return res.status(401).send(err)
    }
}

const getInfo = async (req, res, next) => {
    try {
        const {accessToken} = req.body;
        const compare = compareJWT(accessToken); // object
        if(!compare) return req.status(400).send("Err");
        const uid = compare.sub
        const userExist = await userModel.query().findOne({uid});
        res.send(userExist);
    }
    catch (err) {
        return res.status(401).send(err)
    }
}

//SHA
//RSA
module.exports = {
    users_get,
    register,
    login,
    refreshToken,
    getInfo
}

