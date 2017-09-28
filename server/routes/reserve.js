import express from 'express';
import mongoose from 'mongoose';
import { Reservation, Item, User } from '../models';
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

router.get('/', (req, res) => {
  let now = getNow();
  let _id = mongoose.Types.ObjectId(req.session.userInfo._id);
  Reservation.find({
    start: { $gte: now },
    $or: [
      { user:_id }, { people: _id }
    ]}).populate('item', 'name').
    exec((err, reservations) => {
    if (err) throw err;
    return res.json({
      success: true,
      data: reservations
    });
  });
});

router.post('/', (req, res) => {
  let { start, end, itemId, date, people } = req.body;
  let today = new Date();
  if (date < today.toJSON().slice(0,10).split('-').join('')) { 
    return res.status(400).json({
      error: "INVALID_TIME",
      code: 0
    });
  };
  if (end - start > 12 || end - start <= 0) {
    return res.status(400).json({
      error: "INVALID_TIME",
      code: 0
    });
  };
  start = date * 100 + start; end = date * 100 + end;
  let id_array = people.slice(0);
  id_array.push(req.session.userInfo._id);
  User.find({ '_id': { $in: id_array } }, (err, users) => {
    if (err) throw err;
    if (users.length !== id_array.length) {
      return res.status(400).json({
        error: "INVALID_ID",
        code: 1
      });
    };
    for(let i = 0; i < users.length; i++){
      if (users[i].reservations.includes(parseInt(date))) {
        return res.status(400).json({
          error: "ALREADY_RESERVED",
          code: 2
        });
      };
      if (!users[i].active || !users[i].confirmed) {
        return res.status(403).json({
          error: "INVALID_USER",
          code: 3
        });
      };
    }
    Item.findById(itemId, (err, item) => {
      if (err) throw err;
      let occupied = item.occupied.filter((value) => {
        return (value >= date * 100 && value < (date + 1) * 100);
      });
      for(let i = start; i <= end; i++) {
        if(occupied.includes(i)) {
          return res.status(400).json({
            error: "ALREADY_OCCUPIED",
            code: 4
          });
        };
        occupied.push(i);
      };
      
      let reservation = new Reservation({ start, end });
      reservation.item = itemId;
      reservation.people = people;
      reservation.user = req.session.userInfo._id;
      reservation.save(err => {
        if (err) throw err;
        item.occupied = occupied;
        item.save(err => {
          if (err) throw err;
          User.updateMany({ _id: { $in: id_array }}, { $push: { reservations: date }}, {multi: true}, err => {
            if (err) throw err;
            return res.json({ success: true });
          });
        });
      });
    });
  });
});

router.delete('/:_id', (req, res) => {
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
    if (reservation.user.toString() !== req.session.userInfo._id
                          && req.session.userInfo.name !== 'admin') {
      return res.status(403).json({
        error: "NOT_ALLOWED",
        code: 2
      });
    };
    let id_array = reservation.people.slice(0);
    id_array.push(reservation.user)
    User.update(
      { '_id': { $in: id_array }}, 
      { $pull: {reservations: parseInt(reservation.start / 100)}}, 
      {multi: true}, (err) => {
      if (err) throw err;
      Item.findById(reservation.item, (err, item) => {
        let occupied = item.occupied.slice(0);
        for(let i = reservation.start; i <= reservation.end; i++) {
          occupied.splice(occupied.indexOf(i), 1);
        };
        item.occupied = occupied;
        item.save(err => {
          if (err) throw err;
          Reservation.remove({_id}, (err) => {
            if (err) throw err;
            return res.json({ success: true });
          });
        });
      });
    });
  });
});

export default router;
