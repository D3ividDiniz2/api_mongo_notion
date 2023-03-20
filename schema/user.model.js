const express = require('express'),
      mongoose = require('mongoose'),  
      bodyParser = require('body-parser'),
      app = express(),
      port = 3000;

const schema = new mongoose.Schema({ email: 'string', password: 'string', name:'string'});
const Users = mongoose.model('User', schema);

module.exports = Users;