import express from 'express';
import WebSocket from 'ws';
import { Reservation } from '../models';

const router = express.Router();

router.get('/:_id', (req, res) => {
  if (typeof req.session.userInfo === "undefined") {
    return res.status(403).json({
      error: "NOT_LOGGED_IN",
      code: -3
    })
  };

  let student_id = req.session.userInfo._id;
  let redisClient = req.app.get('redisClient'); 
  let today = new Date();
  let date = today.toJSON().slice(0,10).split('-').join('');
  let now = date + (today.getHours() * 2 + (today.getMinutes() >= 30 ? 1 : 2))
  Reservation.find({ 
    user: student_id, 
    start: { $lte: now }, 
    end: { $gte: now }}, (err, exist) => {
    if (err) throw err;
    if (!exist) {
      return res.status(400).json({
        error: "NOT_ALLOWED",
        code: 0
      });
    };
    let ws = new WebSocket(`ws://125.130.66.85:3000/ws/${req.params._id}`);
    ws.send('open');
    ws.close();
  })
});

export default router;
