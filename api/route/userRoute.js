'use strict'
const app = require('../../server.js');
const mongoose = require('mongoose')
const User = mongoose.model('User')
//const User = require('../models/users')
const { register, sign_in, LoginRequired, profile } = require('../controllers/userController');

module.exports = function(app){
  app.route('/auth/register', (req, res, next) => {
    res.send('hello world')
    const user = new User({
   email: req.body.email,
   password: req.body.password,
   name: req.body.name
 })
   res.send(user)
    next()
  })
 .post(register)
}


















// module.exports = function(app){
//   const handleUser = require('../controllers/userController.js')
//   router.post('auth/register', (req, res, next) =>{
//     const user = new User({


//     })
//     next()
//     })

// }














/// another way of handling router


/***  
 * 
  //get users
  app.route('auth/register')
  .post(handleUser.register)

  app.route('/auth/sign_in')
  .post(handleUser.sign_in);

  app.route('/user')
  .post(handleUser.LoginRequired, () =>  handleUser.user)

 *** */
