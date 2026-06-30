const User=require("../models/User");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");

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
        const hashPassword =await bcrypt.hash(password,10);
        const user=await User.create({name,email,password:hashPassword});
        res.status(201)
    }
    catch(err){
        res.status(500).json({
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
const isMatch=await bcrypt.compare(password,user.password);
if(!isMatch){
    return res.status(401).json({
        success:false,
        message:"invalid password"
    });
}
//payload ,key ,expiresin
const token =jwt.sign({
    id:user._id,email:user.email
},process.env.SECRET_KEY,{expiresIn:"1d"})
res.json({
    success:true,
    message:"login success",
    token,
    data:user
})

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
const logout=(req,res)=>{
    res.json({
        success:true,
        message:"logout succesfully"
    })
};
module.exports={register,login,profile,logout};