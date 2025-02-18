require('dotenv').config();
const session = require("express-session");
const SECRET_KEY = process.env.SECRET_KEY;
const configSession = (app) => {
    app.use(session({
        secret: SECRET_KEY,
        resave: false,
        saveUninitialized: true
    }));
}
module.exports = configSession;