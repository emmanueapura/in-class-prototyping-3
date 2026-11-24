const express = require('express')
const postController = require('../controllers/post.js')

const {verify,isAdmin} = require('../auth')

const router= express.Router();

router.get('/allPosts', postController.getAllPost);
router.get('/:id', postController.getSpecificPost);
router.post('/addPost', verify, postController.addPost);
router.patch('/updatePost/:id', verify, postController.updatePost);
router.delete('/deletePost/:id', verify, postController.deletePost);
router.delete('/deletePostByAdmin/:id', verify,isAdmin, postController.deletePostByAdmin);
router.post('/addComment/:id',verify,postController.addComment)
module.exports=router