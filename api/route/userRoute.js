'use strict'
const mongoose = require('mongoose')
const app = require('../../server.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');
//const Users = require('../models/users')



//const { register, sign_in, LoginRequired, profile} = require('../controllers/userController');

module.exports = function (app) {
  app.post('/auth/register', (req, res, next) => {
    const newUser =  new User ({
      email: req.body.email,
      name: req.body.name,
      hash_password: req.body.password
    })
    newUser.save().then(result => {console.log(result)})
    .catch(err => console.log(err))
    res.status(201).json({
      message: 'Handling POST request to /auth/register',
      createdUser: newUser
    })
    next()
    });
  }








// module.exports = function(app){
//   const handleUser = require('../controllers/userController.js')
//   app.route('/auth/register', (req, res, next) =>{
//     const user = new User({
//       email: req.body.email,
//       name: req.body.name,
//       password: req.body.password

//     })
//     res.send(user)
//     //.post(user)
//     next()
//     })

// }




/****  
 app.post('/auth/register', (req, res, next) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
      
    });
    user.save(function (err, user){

    })
    res.send(user)
    next()
 
 ***/









/// another way of handling router



  //get users

// module.exports = function(app) {
//   app.route('/auth/register')
//   .post(register)

  // app.route('/auth/sign_in')
  // .post(sign_in);

//   app.route('/user')
//   .post(handleUser.LoginRequired, () =>  handleUser.user)
 //}
  
