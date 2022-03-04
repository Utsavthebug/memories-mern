const express = require("express")
const { getPosts, createPost,updatePost,deletePost,likePost} = require("../controllers/posts")
const router = express.Router()
const auth = require("../midlleware/auth")

router.route("/").get(getPosts).post(auth,createPost)
router.route("/:id").patch(auth,updatePost).delete(auth,deletePost)
router.route('/:id/likePost').patch(auth,likePost)


module.exports = router