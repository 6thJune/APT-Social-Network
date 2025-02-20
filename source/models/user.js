const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        minlength: 6,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    postsLiked: {
        type: Array
    }
})
const user = mongoose.model('user', userSchema);
module.exports = user;