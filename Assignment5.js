var express = require('express');

//console.log("in server.js");
var app = express();
var Search=require('./Search');
var id;
app.get('/students',Search.find);
app.listen(3001);
console.log("server started\' on port 3001...");