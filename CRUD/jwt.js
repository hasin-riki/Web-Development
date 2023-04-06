const jwt=require('jsonwebtoken');
const User=require('../models/userModel');
const Error=require('http-errors');
require('dotenv').config();

const signAccessToken=(user)=>{
    return new Promise((resolve,reject)=>{
        const payload={user};
        const secretAccess=process.env.SECRET_ACCESS_TOKEN;
        options={
            expiresIn: '20s',
        }

        jwt.sign(payload, secretAccess, options, (error, token)=>{
            if(error){
                console.log(error.message);
                reject(Error[500]);//Internal Server Error
            }
            resolve(token);
        });
    });
};

const verifyAccessToken=(req,res,next)=>{

    const authHeader=req.headers['authorization'];
    const token=authHeader && authHeader.split(' ')[1];//Header is made up of 'Bearer Token'
    
    if(token==null){
        return res.sendStatus(401);//Unauthorized
    }

    jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (error, user)=>{
        if(error){
            return res.sendStatus(403);//Forbidden
        }
        req.user=user;
        next()
    });
};

const signRefreshToken=(user)=>{
    return new Promise((resolve,reject)=>{
        const payload={};
        const secretRefresh=process.env.SECRET_REFRESH_TOKEN;
        options={
            expiresIn: '1m',
            issuer: 'pickurpage.com',
            audience: user
        }

        jwt.sign(payload, secretRefresh, options, (error, token)=>{
            if(error){
                console.log(error.message);
                reject(Error[500]);//Internal Server Error
            }
            resolve(token);
        });
    });
};

const verifyRefreshToken=(refreshToken)=>{
    return new Promise((resolve,reject)=>{
        jwt.verify(refreshToken, process.env.SECRET_REFRESH_TOKEN, (error, user)=>{
            if(error){
                return reject(Error[401]);//Unauthorized
            }
            const userId=user.aud;

            resolve(userId);
        });
    });
};

module.exports={
    signAccessToken,
    verifyAccessToken,
    signRefreshToken,
    verifyRefreshToken
}