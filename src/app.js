const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const ownersRouter = require('./routes/ownersRouter');
const usersRouter = require('./routes/usersRouter');
const productsRouter = require('./routes/productsRouter');
const home = require('./routes/Index')
const expressSession = require('express-session');
const flash = require('connect-flash');


app.use(express.json({
    limit: "16kb",
}));

app.use(express.urlencoded({
    extended: true, 
    limit: "16kb"
}));


app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");
app.use(expressSession({
    secret: process.env.EXPRESS_SESSION,
    resave: false,
    saveUninitialized: false,
}));
app.use(flash());

app.use('/' , home);
app.use("/owners" , ownersRouter);
app.use("/users" , usersRouter);
app.use("/products" , productsRouter);

module.exports = app;