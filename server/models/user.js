import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;

const User = new Schema({
  student_id: String,
  name: String,
  password: String,
  confirmed: { type: Boolean, default: false },
});

User.methods.generateHash = function(password){
  return bcrypt.hashSync(password, 10);
};

User.methods.validateHash = function(password){
  return bcrypt.compareSync(password, this.password);
};

export default mongoose.model('user', User);
