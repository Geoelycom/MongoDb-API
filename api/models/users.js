const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { ObjectId } = require('bson');
const { Schema } = mongoose;

/** User Schema Defination */

const userSchema = new Schema({
    name: {
      type: String,
      trim: true,
      required: true
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: true
    },
    //Hash-password in place of password for clarity
    hash_password: {
   type: String,
   required: true
  },
    Token: {
      type: String,
      //required: true
    },
    profilePicture: {
      type: Buffer,
      //required: true
    },

  userInterests: {
    userId: ObjectId,
    interest: String
  },

  Tasks: {
    taskName: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
  }
})

userSchema.methods.comparePassword = hash_password => {
  return bcrypt.compareSync(hash_password, this.hash_password);
}

module.exports = mongoose.model('User', userSchema )

