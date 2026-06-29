const User=require("../models/User");
const jwt=require("jsonwebtoken");
const bcryptjs=require("bcryptjs");

const register=async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        const oldUser=await User.findOne({email});
        if(oldUser){
            return res.status(401)>json({
                success:false,
                message:"user already exist"
            });
        }
        const hashPassword =await bcryptjs.hash(password,10);
        const user=await User.create({name,email,password:hashPassword});
        res.status(201).json({
            success:true,
            message:"unable to register",
            erroe:err.message
        });
    }
    catch(err){
        res.status(500)>json({
            success:false,
            message:"unable to register",
            error:err.message
        })
    }

};
const login=async(req,res)=>{
    try{
const {email,password}=req.body;
const user=await User.findOne({email});
if(!user){
    return res.status(401).json({
        success:false,
        message:"invalid email"
    });
}
const isMatch=await bcryptjs.compare(password,user.password);
if(!isMatch){
    return res.status(401).json({
        success:false,
        message:"invalid password"
    });
}
const token =jwt.sign({
    id:user._id,email:user.email
}.process.env.SECRET_KEY,{expiresin:"1d"})

    }
    catch(err){
        res.status(500).json({
            success:false,
            message:"unable to login",
            error:err
        });
    }

};
const profile=(req,res)=>{
    res.json({
        success:true,
        message:"profile fetched",
        user:req.user
    })

};
const logout=()=>{

};
module.exports={register,login,profile,logout};