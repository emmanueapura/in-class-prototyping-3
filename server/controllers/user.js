const mongoose = require('mongoose');
const User = require('../models/User.js')
const {errorHandler} = require('../auth')
const bcrypt =require('bcrypt')

const auth = require('../auth')

module.exports.userRegister = (req,res) =>{
	if(!req.body.email.includes("@") || !req.body.email.includes('.com')){
		return res.status(400).send({message: "Invalid email"})
	}

	if(req.body.password.length<7){
		return res.status(400).send({message:"Password must be 7 characters or high"})
	}

	let newUser= new User({
		email: req.body.email,
		username: req.body.username,
		password: bcrypt.hashSync(req.body.password,10)
	})

	return newUser.save().then(result => res.status(201).send({message:"Created Successfully"})).catch(e=> errorHandler(e,req,res,res))
}

module.exports.userLogin = (req,res)=>{
	return User.findOne({email:req.body.email}).then(result=>{
		if(!result){
			return res.status(404).send("Not found")
		}
		const isPasswordCorrect = bcrypt.compareSync(req.body.password, result.password)
		if(!isPasswordCorrect){
			return res.status(401).send({auth:"Wrong credentials"})
		}
		else{
			return res.status(200).send({message: auth.createAccessToken(result)})
		}
	}).catch(e=> errorHandler(e,req,res,res))
}

module.exports.userDetails = (req,res)=>{
	return User.findById(req.user.id).then(result=>res.status(200).send(result)).catch(e=> errorHandler(e,req,res,res))
}