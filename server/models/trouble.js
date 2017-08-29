import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const troubleSchema = new Schema({
  reservation: { type: Schema.Types.ObjectId, ref: 'Reservation' },
  content: String
});

export default mongoose.model('Trouble', troubleSchema);
