import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const reservationSchema = new Schema({
  reserved: { type: Schema.Types.ObjectId, ref: 'User' },
  item: { type: Schema.Types.ObjectId, ref: 'Item' },
  start: { type: Number, min: 0, max: 23 },
  end: { type: Number, min: 0, max: 23 }
});

export default mongoose.model('Reservation', reservationSchema);
