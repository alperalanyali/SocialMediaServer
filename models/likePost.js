const mongoose = require('mongoose');

const likePostSchema = mongoose.Schema({
    _id: String,
    userId: String,
    postId: String,
    
});

const LikePost = mongoose.model('LikePost', likePostSchema);

module.exports = LikePost;