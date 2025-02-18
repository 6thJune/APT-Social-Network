const mongoose = require('mongoose');
const postSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    username: {
        type: String,
        required: true
    },
    time: {
        type: String,
        default: () => {
            const date = new Date();
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            return `${hours}:${minutes} ${day}/${month}`;
        }
    },
    content: {
        type: String,
        required: true
    },
    photoUrl: {
        type: String,
        default: ''
    },
    noLike: {
        type: Number,
        default: 0
    }
})
const post = mongoose.model('post', postSchema);
module.exports = post;