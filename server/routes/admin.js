import express from 'express';
import { Trouble, Reservation } from '../models';

const router = express.Router();

//router.use((req, res, next) => {
//  if (typeof req.session.userInfo.name !== "admin") {
//    return res.status(403).json({
//      error: "NOT_ALLOWED",
//      code: 0
//    })
//  };
//  next();
//});

router.get('/trouble', (req, res) => {
  Trouble.find({}).sort('-time').exec((err, troubles) => {
    if (err) throw err;
    return res.json({ data: troubles });
  });
});

router.get('/timetable/:date', (req, res) => {
  let date = parseInt(req.params.date);
  let today = new Date();
  if (date < today.toJSON().slice(0,10).split('-').join('')) {
    return res.status(400).json({
      error: "INVALID_DATE",
      code: 0
    });
  }
  Reservation.find({ $and: [
    { start: { $gte: date * 100 }}, { end: { $lt: (date + 1) * 100 }}]}).
    populate([
      { path: 'user', select: 'student_id name' },
      { path: 'item', select: 'name'}]).
    sort({'item': 1, 'start': 1}).exec((err, reservations) => {
    if (err) throw err;
    let reservationMap = {};
    reservations.forEach(reservation => {
      if (reservationMap.hasOwnProperty(reservation.item.name)) {
        reservationMap[reservation.item.name].push({
          user: reservation.user, 
          start: reservation.start, 
          end: reservation.end
        });
      } else {
        reservationMap[reservation.item.name] = [{
          user: reservation.user, 
          start: reservation.start, 
          end: reservation.end
        }];
      }
    });
    return res.json({ data: reservationMap });
  });
});

router.post('/notice', (req, res) => {
  let redisClient = req.app.get('redisClient');
  let content = req.body.content;

  redisClient.set('notice', content);
  return res.json({ success: true });
});

export default router;
