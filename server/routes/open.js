import express from 'express';
import { Reservation } from '../models';

const router = express.Router();

router.use((req, res, next) => {
  if (typeof req.session.userInfo === "undefined") {
    return res.status(403).json({
      error: "NOT_LOGGED_IN",
      code: -3
    })
  };
  next();
});

router.post('/', (req, res) => {
  let { ip } = req.body;
  let redisClient = req.app.get('redisClient');
  redisClient.set('ip', ip);
  return res.json({ success: true })
});

router.get('/', (req, res) => {
  let student_id = req.session.userInfo._id;
  let redisClient = req.app.get('redisClient'); 
  let today = new Date();
  toady = today.toJSON().slice(0,10).split('-').join('');
  let now = today + (today.getHours() * 2 + (today.getMinutes() >= 30 ? 1 : 2))
  Reservation.find({ 
    user: _id, 
    start: { $lte: now }, 
    end: { $gte: now }}, (err, exist) => {
    if (err) throw err;
    if (!exist) {
      return res.status(400).json({
        error: "NOT_ALLOWED",
        code: 0
      });
    };
    redisClient.get('ip', (err, ip) => {
      if (err) throw err;
      if (!ip) {
        return res.status(400).json({
          error: "NOT_CONNECTED",
          code: 1
        });
      };
      fetch(`http://${ip}:8080/api/move`).then(res => {
        return res.json({ success: true });
      }).catch((err) => {
        throw err;
      });
    });
  })
});

export default router;
