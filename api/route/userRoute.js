'use strict'

module.exports = function(app){
  const handleUser = require('../controllers/userController.js')
  //get users
  app.route('auth/register')
  .post(handleUser.register)

  app.route('/auth/sign_in')
  .post(handleUser.sign_in);

  app.route('/user')
  .post(handleUser.LoginRequired, () =>  handleUser.user)

}