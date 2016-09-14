var mongoose = require("mongoose");
    validators = require('mongoose-validators'),
    uniqueValidator = require('mongoose-unique-validator'),
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

var userSchema = new mongoose.Schema( {
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, validate: validators.isEmail({message:'Invalid Email'}), required: true, index: { unique: true }},
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Photographer'}],
  bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event'}],
  reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'Review'}],
  avatarBase: {type: String, default: "default.png"}
},
{
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
});

userSchema.virtual('avatarUrl').get(function() {
  return '../../../../../img/users/avatar/' + this.avatarBase;
})

userSchema.virtual('fullName').get(function() {
  return this.firstName + " " + this.lastName
})

userSchema.virtual('firstLastInitial').get(function() {
  return this.firstName + " " + this.lastName.charAt(0)
})

// Save hash of password
userSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // hash the password along with our new salt
    bcrypt.hash(user.password, SALT_WORK_FACTOR, function(err, hash) {
        if (err) return next(err);

        // override the cleartext password with the hashed one
        user.password = hash;
        next();
    });
});

userSchema.methods.validatePW = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

userSchema.plugin(uniqueValidator, {message: 'Account with that {PATH} already exists'})

var user = mongoose.model('User', userSchema);

module.exports = {
  User: user
}
