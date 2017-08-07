import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  student_id: String,
  name: String,
  email: String,
  password: String,
  active: { type: Boolean, default: false },
  confirmed: { type: Boolean, default: false },
  penalty: { type: Number, default: 0 },
  reservations: [{ type: Schema.Types.ObjectId, ref: 'Reservation' }]
});

userSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, 10);
};

userSchema.methods.validateHash = function(password){
  return bcrypt.compareSync(password, this.password);
};

export default mongoose.model('User', userSchema);
