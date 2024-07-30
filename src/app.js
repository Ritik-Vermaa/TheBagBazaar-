const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');


app.use(express.json({
    limit: "16kb",
}));

app.use(express.urlencoded({
    extended: true, limit: "16kb"
}))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "ejs");
module.exports = app;