require('dotenv').config();
require('./config/database');
const configViewEngine = require('./config/view-engine');
const configSession = require('./config/session');
const express = require('express');
const app = express();

app.use(express.json());

configViewEngine(app);
configSession(app);

const authRoutes = require('./routes/auth-routes');
const postRoutes = require('./routes/post-routes');
const otherRoutes = require('./routes/other-routes');
const authControllers = require('./controllers/auth-controllers');
const postControllers = require('./controllers/post-controllers');
const otherControllers = require('./controllers/other-controllers');

app.use('/', authRoutes);
app.use('/', postRoutes);
app.use('/', otherRoutes);
app.use('/', authControllers);
app.use('/', postControllers);
app.use('/', otherControllers);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})