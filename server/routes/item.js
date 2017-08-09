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
  let date = req.params.date;
  let today = new Date();
  if (date < today.toJSON().slice(0,10).split('-').join('')) {
    return res.status(400).json({
      error: "INVALID_DATE",
      code: 0
    });
  }
  Item.find({}, (err, items) => {
    if (err) throw err;
    let itemList = [], itemMap = {};
    items.forEach(item => {
      if (item.active) {
        itemMap = {};
        itemMap['name'] = item.name;
        itemMap['_id'] = item._id;
        itemMap['occupied'] = item.occupied.filter(value => {
          return (value >= date * 100 && value < (date +1) * 100);
        });
        itemList.push(itemMap);
      };
    });
    return res.json({ data: itemList });
  });
});

export default router;
