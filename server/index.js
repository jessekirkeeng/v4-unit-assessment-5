require('dotenv').config();
const express = require('express'),
    userCtrl = require('./controllers/user'),
    postCtrl = require('./controllers/posts')
const massive = require("massive");
const session = require("express-session");



const { SESSION_SECRET, SERVER_PORT, CONNECTION_STRING } = process.env;

const app = express();

massive({
    connectionString: CONNECTION_STRING,
    ssl: { rejectUnauthorized: false },
}).then((db) => {
    app.set("db", db);
    console.log("db connected");
}).catch(err => console.log(err));

app.use(
    session({
        resave: true,
        saveUninitialized: false,
        secret: SESSION_SECRET,
        cookie: { maxAge:  60000 * 60 * 24 * 90}
})
);

app.use(express.json());

//Auth Endpoints
app.post('/api/auth/register', userCtrl.register);
app.post('/api/auth/login', userCtrl.login);
app.get('/api/auth/me', userCtrl.getUser);
app.post('/api/auth/logout', userCtrl.logout);

//Post Endpoints
app.get('/api/posts', postCtrl.readPosts);
app.post('/api/post', postCtrl.createPost);
app.get('/api/post/:id', postCtrl.readPost);
app.delete('/api/post/:id', postCtrl.deletePost)

app.listen(4000, (SERVER_PORT) => console.log(`running on ${4000}`));