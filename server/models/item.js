import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: String,
  category: String,
});

export default mongoose.model('Item', itemSchema);
