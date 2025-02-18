require('dotenv').config();
const mongoose = require('mongoose');
const MONGO_URL = process.env.MONGO_URL;

const mongoConnetion = mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB!')
}).catch(() => {
    console.log('Cannot connect to MongoDB!')
})
module.exports = mongoConnetion;