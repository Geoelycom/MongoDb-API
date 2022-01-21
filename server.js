require('dotenv').config();
const express = require('express');
const mongoose = require("mongoose");
const routes = require('./api/route/userRoute')
const bodyParser = require("body-parser");
 User = require('./api/models/users')
const jsonwebtoken = require("jsonwebtoken")
// Basic Configuration
const port = process.env.PORT || 5000;


const options = {
  autoIndex: false, // Don't build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4 // Use IPv4, skip trying IPv6
};



mongoose.connect( 'mongodb+srv://Elyan: ' + process.env.DB_URI + '@userproifle.g0qgd.mongodb.net/?retryWrites=true&w=majority', options).then(function(){
  //connected successfully
}, function(err){
  mongoose.connection.on('error', err => {
    logError(err);
  });


})
console.log(mongoose.connection.readyState);

const app = express();
app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());


app.use(function (req, res, next){
if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT'){
  jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RestfulApis', function(err, decode){
    if (err) req.user = undefined;
    req.user = decode;
    next()
  });
} else {
  req.user = undefined;
  next()
} 
});


routes(app);

app.use(function(req, res){
  res.status(404).send({ url: req.originalUrl + 'not found' })
})


app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

module.exports = app;
