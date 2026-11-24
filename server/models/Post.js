const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
	title:{
		type: String,
		required: [true, "Title of post is required"]
	},
	content:{
		type: String,
		required: [true, "Content of post is required"]
	},
	author:{
		type: String,
		required: [true, "Title of post is required"]
	},
	comments:{
		type: [{
			author: {
				type: String,
				required: true
			},
			comment:{
				type: String,
				required: true
			},
			createdDate:{
				type: Date,
				default: Date.now
			}
		}],
		default:[]
	},
	createdDate:{
		type: Date,
		default: Date.now
	}
})

module.exports = mongoose.model("Post", postSchema);
