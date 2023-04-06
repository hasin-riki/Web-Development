const User=require('../models/userModel');
const express=require('express');
const router=express.Router();
const JWT=require('../authentication/jwt');
const { authSchema }=require('../authentication/authenticationSchema');
const jwt=require('jsonwebtoken');
require('dotenv').config();

const signup = async(req,res)=>{
    try {
        const result=await authSchema.validateAsync(req.body);
        const doesExist=await User.findOne({email: result.email});
        console.log(result)
        if(doesExist){
            throw res.status(409)//Conflict
        }

        const user=await User.create(result);
        const accessToken=jwt.sign({userId: user.id}, process.env.SECRET_ACCESS_TOKEN, {expiresIn: "2h"});
        const refreshToken=jwt.sign({userId: user.id}, process.env.SECRET_REFRESH_TOKEN);
        res.status(200).send({accessToken, refreshToken});
    } catch (error) {

        console.log(error)
        res.sendStatus(500);
    }
}

const login = async(req, res)=>{
    try {
        const result=await User.schema.validateAsync(req.body);
        const user=await User.findOne({email: email});
        
        if(!user){
            throw res.status(404);//Not Found
        }

        const isMatch=await user.isValidPassword(result.password);
        if(!isMatch){
            throw res.status(401);//Unauthorized
        }

        const accessToken=JWT.signAccessToken(user.id);
        const refreshToken=JWT.signRefreshToken(user.id);
        res.status(200).json(user);
        res.send({accessToken, refreshToken});
    } catch (error) {
        res.status(400).json({message: error.message});//Bad Request
    }
};

const refreshToken = async(req, res, next)=>{
    try {
        const refreshToken=req.body;
        if(!refreshToken){
            throw res.status(400);//Bad request
        }

        const user=await JWT.verifyRefreshToken(refreshToken);
        const accessToken=await JWT.signAccessToken(user);
        const refToken=await JWT.signRefreshToken(user);

        res.send({accessToken: accessToken, refreshToken: refToken});
    } catch (error) {
        next(error);
    }
};

const getAllUsers = async(req,res)=>{
    try {
        const users=await User.find({});
        res.status(200).json(users);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
}

const getUser = async(req,res)=>{
    try {
        const userId=req.params.id;
        const user=await User.findById(userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const updateUser = async(req,res)=>{
    try {
        const userId=req.params.id;
        const user=await User.findByIdAndUpdate(userId,req.body);
        if(!product){
            return res.status(404).json({message: 'cannot find any product'});
        }
        const updatedUser=await User.findById(userId);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deleteUser = async(req,res)=>{
    try {
        const userId=req.params.id;
        const user=await User.findByIdAndDelete(userId);
        if(!product){
            return res.status(404).json({message: 'cannot find any product'});
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

router.post('/signup', signup);

router.post('/login', login);

router.post('/refresh-token', refreshToken)

router.get('/', JWT.verifyAccessToken, getAllUsers);

// router.get('/:id', JWT.verifyAccessToken, getUser);

// router.put('/:id', JWT.verifyAccessToken, updateUser);

// router.delete('/:id', JWT.verifyAccessToken, deleteUser);

module.exports=router;