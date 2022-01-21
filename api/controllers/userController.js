const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
 //require('../models/users')
  const User = mongoose.model('User')

//Register New user
exports.register = function(req, res){
  const newUser = new User(req.body);
  newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
  newUser.save(function(err, user){
    if (err){
      return res.status(400).send({
        message: err
      });
    } else {
    user.hash_password = undefined;
    return res.json(user)
    }
  })
}

/// Getting User with MongoDb aggregation Pipeline.(Task one)
exports.sign_in = function(req, res){
  User.aggregate([{
    $match: {users: '_id', userInterests: 'interest' }
  }, function(err, user){
    if (err) throw err;
    if (!user || !user.comparePassword(req.body.password)){
      return res.status(401).json({ message: 'Authentication failed. Invalid user or password.'})
    }
    return res.json({ token: jwt.sign({ email: user.email, name: user.name, _id: user._id}, 'RestfulApis')});
  }])
};

/// Adding authentication to login
exports.LoginRequired = function(req, res, next){
  if (req.user){
    next()
  } else {
    return res.status(401).json({message: 'Unauthorized user!!'});
  }
};

// Create User profile

exports.profile = function(req, res, next){
  if (req.user){
    res.send(req.user);
    next()
  }
  else {
     return res.status(401).json({ message: 'Invalid token'})
  }
};

/// Creating a Report that returns an excel file







/**  
 
User.aggregate([{
    $match: {users: '_id', userInterests: 'interest' }
  }])

 * */