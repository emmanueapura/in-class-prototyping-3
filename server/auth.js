const jwt = require('jsonwebtoken')

module.exports.createAccessToken= (user) =>{

	const data ={
		id: user._id,
		username: user.username,
		isAdmin: user.isAdmin

	}
	return jwt.sign(data,"BlogApplication",{})



}

module.exports.verify=(req,res,next)=>{	
	let token = req.headers.authorization
	if(!token){
		return res.send({auth:"No token"})
	}

	token= token.slice(7,token.length)
	jwt.verify(token,"BlogApplication",(e,decodedToken)=>{
		if(e){
			res.send({auth:"failed"})
		}
		else{
			req.user= decodedToken	
			next();
		}
	})
	
}

module.exports.isAdmin=(req,res,next)=>{
	if(!req.user.isAdmin){
		return res.status(401).send({auth:"Not an Administrator"})
	}

	next();
}

module.exports.errorHandler=(error,req,res,next)=>{
	console.log(error)

	res.status(error.status).send({
		message: error.message,
		errorCode : error.code,
		details : error.details
	})

}