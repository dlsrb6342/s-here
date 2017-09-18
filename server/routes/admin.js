import express from 'express';
import { Trouble } from '../models';

const router = express.Router();

router.use((req, res, next) => {
  if (typeof req.session.userInfo.name !== "admin") {
    return res.status(403).json({
      error: "NOT_ALLOWED",
      code: 0
    })
  };
  next();
});

router.get('/trouble', (req, res) => {
  Trouble.find({}).sort('-time').exec((err, troubles) => {
    if (err) throw err;
    return res.json({ data: troubles });
  });
});

router.post('/notice', (req, res) => {
  let redisClient = req.app.get('redisClient');
  let content = req.body.content;

  redisClient.set('notice', content);
  return res.json({ success: true });
});

router.get('/notice', (req, res) => {
  let redisClient = req.app.get('redisClient');
  redisClient.get('notice', (err, reply) => {
    if (err) throw err;
    return res.json({ data: reply });
  });
});

export default router;
