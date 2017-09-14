import express from 'express';
import mongoose from 'mongoose';
import { Reservation, Trouble } from '../models';
import { getNow } from '../utils';

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

router.get('/:rasp', (req, res) => {
  let student_id = req.session.userInfo._id;
  let now = getNow(); 
  Reservation.find({ 
    $or: [{ user: student_id }, { people: student_id }], 
    start: { $lte: now }, 
    end: { $gte: now }}, (err, exist) => {
    if (err) throw err;
    if (exist.length === 0) {
      return res.status(400).json({
        error: "NOT_ALLOWED",
        code: 0
      });
    };

    let wsClient = req.app.get('wsClient');
    if (wsClient.hasOwnProperty(`/ws/${req.params.rasp}/`)){
      wsClient[`/ws/${req.params.rasp}/`].send('open');
      return res.json({ success: true });
    } else {
      return res.status(403).json({
        error: "INVALID_REQUEST",
        code: 1
      }); 
    };
  });
});

router.post('/trouble/:_id', (req, res) => {
  let { content } = req.body;
  let _id = req.params._id;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({
      error: "INVALID_ID",
      code: 0
    });
  };

  Reservation.findById(_id, (err, reservation) => {
    if (err) throw err;
    if (!reservation) {
      return res.status(404).json({
        error: "NOT_EXIST",
        code: 1
      });
    };
    if (reservation.user.toString() !== req.session.userInfo._id) {
      return res.status(403).json({
        error: "NOT_ALLOWED",
        code: 2
      });
    };
    
    let trouble = new Trouble({ reservation: reservation._id, content });
    trouble.save(err => {
      if (err) throw err;
      // TODO  websocket
      return res.json({ success: true });
    });
  });
});
export default router;
