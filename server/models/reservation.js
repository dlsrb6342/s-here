import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const reservationSchema = new Schema({
  reserved: { type: Schema.Types.ObjectId, ref: 'User' },
  item: { type: Schema.Types.ObjectId, ref: 'Item' },
  start: Date,
  end: Date
});

export default mongoose.model('Reservation', reservationSchema);
