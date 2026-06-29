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

    }
    catch(err){
        res.status(500)>json({
            success:false,
            message:"unable to register",
            error:err.message
        })
    }

};
const login=()=>{

};
const profile=()=>{

};
const logout=()=>{

};
module.exports=