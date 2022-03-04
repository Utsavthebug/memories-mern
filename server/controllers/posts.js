const { default: mongoose } = require("mongoose")
const PostMessage = require("../models/postMessage")

exports.getPosts = async(req,res)=>{
   try {
       const posts = await PostMessage.find()
       res.status(200).json(posts)
   } catch (error) {
       res.status(404).json({message:error.message})
   }
}

exports.createPost = async(req,res)=>{
    const  post = req.body
    const  newPost = new PostMessage({...post,creator:req.userId})

    try {
        await newPost.save()
        res.status(201).json(newPost)
    } catch (error) {
       res.status(409).json({message:error.message}) 
    }
}

exports.updatePost = async (req,res) =>{
   const {id : _id} = req.params

   const post = req.body

   if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No Post with that id')
    
   const updatedPost = await PostMessage.findByIdAndUpdate(_id,post,{new:true})

    res.status(200).json(updatedPost)
    
}

exports.deletePost = async (req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Post with that id')

    try {
        await PostMessage.findByIdAndRemove(id)
        res.status(200).json({message:'sucesfully deleted'})


    } catch (error) {
        res.status(400).json(error)
    }
}


exports.likePost  = async (req,res) =>{
    const {id} = req.params

    if(!req.userId) {return res.json({message:'Unauthenticated'})}

    
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Post with that id')

    try {
        const post = await PostMessage.findById(id)

        const index = post.likes.findIndex((id)=> id===String(req.userId))

        if(index==-1){
            post.likes.push(req.userId)
        }
        else{
            post.likes = post.likes.filter((id)=>id!==String(req.userId))
        }


        const updatedPost = await PostMessage.findByIdAndUpdate(id,post,{new:true})
        res.status(200).json(updatedPost)
    } catch (error) {
        res.status(400).json(error)
    }
}

