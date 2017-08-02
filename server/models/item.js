import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: String,
  category: String,
  occupied: [Number],
  active: { type: Boolean, default: true },
});

export default mongoose.model('Item', itemSchema);
