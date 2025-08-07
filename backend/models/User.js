const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  passwordHash: String,
});

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.passwordHash);
};

UserSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};

module.exports = mongoose.model("User", UserSchema);
