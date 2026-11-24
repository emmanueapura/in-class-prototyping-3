const Post = require('../models/Post.js')
const {errorHandler} = require('../auth')



module.exports.getAllPost=(req,res)=>{
	return Post.find({}).then(result=>res.status(200).send(result)).catch(e=>{errorHandler(e,req,res)})
}


module.exports.getSpecificPost=(req,res)=>{
	return Post.findById(req.params.id).then(result=>res.status(200).send(result)).catch(e=>{errorHandler(e,req,res)})
}


module.exports.addPost=(req,res)=>{
	let newPost = new Post({
		title: req.body.title,
		content:req.body.content,
		author: req.user.username
	})

	return newPost.save().then(result=>res.status(201).send(result)).catch(e=>{errorHandler(e,req,res)})
}

module.exports.updatePost = (req,res)=>{
	if(req.body.author || req.body.createdDate){
		return res.status(400).send({message: "Invalid fields"})
	}
	return Post.findByIdAndUpdate(req.params.id, req.body).then(result=>{
		if(!result){
			return res.status(404).send({message:"Post not found"})
		}
		else{
			return res.status(201).send(result)
		}
	}).catch(e=>{errorHandler(e,req,res)})
}

module.exports.deletePost = (req,res)=>{
	return Post.findById(req.params.id).then(post =>{

		if(post.author === req.user.username){
			return Post.findByIdAndDelete(post._id).then(result => res.status(200).send({message:"Deleted successfully"})).catch(e=>{errorHandler(e,req,res)})
		}
		else
		{
			return res.status(404).send({message:"Post not found"})
		}
		
	}).catch(e=>{errorHandler(e,req,res)})
}


module.exports.deletePostByAdmin = (req,res)=>{
	return Post.findByIdAndDelete(req.params.id).then(result => res.status(200).send({message:"Deleted successfully"})).catch(e=>{errorHandler(e,req,res)})
}

module.exports.addComment = (req,res)=>{
	let newComment ={
		author: req.user.username,
		comment: req.body.comment
	}
	return Post.findById(req.params.id).then(post=>{
		if(!post){
			return res.status(404).send({message:"Post not found"})
		}
		else{
			post.comments.push(newComment)
			return post.save().then(result => res.status(200).send({message:"Comment added successfully"})).catch(e=>{errorHandler(e,req,res)})
		}
	}).catch(e=>{errorHandler(e,req,res)})
}