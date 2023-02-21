const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const controller = require('./controller/controllers')
const {connectDb} = require('../node.js/Config/ConnDb')
const mongoose = require('mongoose');
const EventEmitter = require('events');
const fs = require('events');

// db connection 

connectDb();
// middleware: parse the request body in jason format
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// to render ejs templates
app.set('view engine', 'ejs');
//to enable the css in project 
app.use(express.static('views', { type: 'text/css' }));

app.get('/',controller.getData);
app.post('/post', controller.postData);

app.delete('/del/:id', controller.delData);

app.put('/put/:id', controller.putData);

app.get('/emp/:id', controller.getAEmp);
  
app.listen(3500,()=> console.log('Listening on Port: 3500'));

