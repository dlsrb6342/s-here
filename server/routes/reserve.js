import express from 'express';
import { Reservation, Item } from '../models';

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
  let { start, end, itemId, date, people } = req.body;
  start = date * 100 + start; end = date * 100 + end;
  Item.findById(itemId, (err, item) => {
    if (err) throw err;
    let occupied = item.occupied.filter((value) => {
      return (value >= date * 100 && value < (date + 1) * 100);
    });
    for(i = start; i <= end; i++) {
      if(occupied.includes(i)) {
        return res.status(400).json({
          error: "ALREADY_OCCUPIED",
          code: 0
        });
      };
      occupied.push(i);
    };
    
    let reservation = new Reservation({start, end});
    reservation.item = itemId;
    reservation.people = people;
    reservation.user = req.session.userInfo._id;
    reservation.save((err) => {
      if (err) throw err;
      item.occupied = occupied;
      item.save((err) => {
        if (err) throw err;
        return res.json({ success: true });
      });
    });
  });
});

router.delete('/:_id', (req, res) => {
  let _id = req.params._id;
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      error: "INVALID ID",
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
    if (reservation.user === req.session.userInfo._id) {
      return res.status(403).json({
        error: "NOT_ALLOWED",
        code: 2
      });
    }
    Reservation.remove({_id}, (err) => {
      if (err) throw err;
      return res.json({ success: true });
    });
  });
});

export default router;
