//get-all post
//get-my post(using authmiddleware)
//post-save post(using authmiddleware)
//put-update post(using authmiddleware)
//delete-own post(using authmiddleware)

const Post=require("../models/Post");
const createPost=async(req,res)=>{
    try{
        const {title,content}=req.body;
        if(!title||!content){
            return res.status(400).json({
                success:false,
                message:"title and content are required"
            });
        }
        const post=await Post.create({title,content,user:req.user._id});
        res.status(201).json({
            success:true,
            message:"post created successfully",
            post
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:"unable to add post",
            error:err.message
        })
    }
}
const getAllPost=async(req,res)=>{
    try{
        const posts=await Post.find().populate("user","name email");
        //sorting and user info
            res.json({
                success:true,
                message:"all posts",
                total:posts.length,
                posts
            })
    }
        catch(err){
            res.status(500).json({
                success:false,
                message:"unable to fetch your posts",
                error:err.message
            })
        };
    }
    const getMyPost=async(req,res)=>{
        try{
            const posts=await Post.find({user:req.user._id})
                       res.status(201).json({
                success:true,
                message:"your posts",
                total:posts.length,
                posts
            })
    }
        catch(err){
            res.status(500).json({
                success:false,
                message:"unable to fetch your posts",
                error:err.message
            })
        };
    }
    const getSinglePost=async(req,res)=>{
        try{
            const {id}=req.params;
            const post=await Post.findById(id);
            if(!post){
                return res.status(401).json({
                    success:false,
                    message:"post not found"
                });
            }
                res.status(201).json({
                    success:true,
                    message:"post found",
                    post
                })
            }
        
            catch(err){
                res.status(500).json({
                    success:false,
                    message:"unable to fetch your posts",
                    error:err.message
                })
            }
        }
        const updatePost=async(req,res)=>{
            try{
                const {id}=req.params;
                const {title,content}=req.body;
                let post=await Post.findById(id);
                if(!post){
                    return res.status(401).json({
                        success:false,
                        message:"post not found"
                    })
                }
                if(post.user.toString()!==req.user._id.toString()){
                    return res.status(403).json({
                        success:false,
                        message:"you can only update your own post"
                    });
                }
                post.title=titlle || post.title;
                post.content=content||post.content;
                await post.save();

                res.status(200).json({
                    success:true,
                    message:"updated successfully",
                    post
                    
                })
            }
            catch(err){
                console.log(err);
                res.status(500).json({
                    success:false,
                    message:"unable to update post",
                    error:err.message
                })
        }
    }
module.exports={createPost,getAllPost,getMyPost,getSinglePost,updatePost,deletePost};