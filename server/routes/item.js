import express from 'express';
import { Item } from '../models';

const router = express.Router();

router.use((req, res, next) => {
  if (typeof req.session.userInfo === "undefined") {
    return res.status(403).json({
      error: "NOT_LOGGED_IN",
      code: -3
    });
  };
  next();
});

router.get('/:date', (req, res) => {
  let date = parseInt(req.params.date);
  let today = new Date();
  if (date < today.toJSON().slice(0,10).split('-').join('')) {
    return res.status(400).json({
      error: "INVALID_DATE",
      code: 0
    });
  }
  Item.aggregate([
    { $match: { 
      active: true 
    }},
    { $unwind: '$occupied' },
    { $match: { $and: [
      { occupied: { $gte: date * 100 }}, 
      { occupied: { $lt: (date + 1) * 100 }}
    ]}},
    { $group : {
      _id: "$_id",
      occupied: { $addToSet : "$occupied" }
    }}
  ], (err, items) => {
    if (err) throw err;
    return res.json({ data: items });
  });
});

export default router;
