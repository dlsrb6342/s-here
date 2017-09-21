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

router.get('/test', (req, res) => {
  Item.find({}, (err, items) => {
    console.log(items);
    return res.json({data: items});
  });
});

router.get('/:date', (req, res) => {
  let date = parseInt(req.params.date);
  let today = new Date();
  if (date < today.toJSON().slice(0,10).split('-').join('')) {
    return res.status(400).json({
      error: "INVALID_DATE",
      code: 0
    });
  };
  Item.aggregate([
    { $match: { active: true }},
    { $project: {
      name: 1, category: 1,
      occupied: {
        $filter: {
          input: { $setUnion: [ "$occupied", [] ]},
          as: "o",
          cond: { $and : [
            { $gte: [ "$$o", date * 100 ]},
            { $lt: [ "$$o", (date + 1) * 100 ]}
          ]}
        }
      }
    }}
  ], (err, items) => {
    if (err) throw err;
    console.log(items);
    return res.json({ data: items });
  });
});

export default router;
