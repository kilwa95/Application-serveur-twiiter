const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcryptjs');


const userSchema = schema({
  username: { type: String, required: true},
  local: {
    email: { 
      type: String, 
      required: [true,'email est obligatoire'],
      unique: [true,'cette email exite déja'],
    },
    password: { type: String, required: true },
    googleId: {type: String}
  },
  avatar: { type: String, default: '/images/profile.png' }
});



userSchema.statics.hashPassword = (password) => {
  return bcrypt.hash(password, 12);
}

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.local.password)
}


const User = mongoose.model('user', userSchema);

module.exports = User;


