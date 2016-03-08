var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema;



var UserSchema = new Schema({
   name: String,
   email: { type: String, trim: true, required: 'Email address is required', index: { unique: true }, match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']},
   username: { type: String, trim: true, required: 'Username is required', index: { unique: true}},
   password: { type: String, required: 'Password is required', select: false}
});

UserSchema.pre('save', function(next){
   
   var user = this;
   
   if(!user.isModified('password')) return next();
   
   bcrypt.hash(user.password, null, null, function(err, hash){
      if (err) return next(err);
      
      user.password = hash;
      next();
      
   });
   
});

UserSchema.methods.comparePassword = function(password) {
    var user = this;
    
    return bcrypt.compareSync(password, user.password);
}

module.exports = mongoose.model('User', UserSchema);