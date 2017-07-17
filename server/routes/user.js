import express from 'express';
import uuidV4 from 'uuid/v4';
import User from '../models/user';
import config from '../config';

const router = express.Router();

router.get('/', (req, res) => {
  if (typeof req.session.userInfo === "undefined") {
    return res.status(401).json({
      error: "NO_INFO",
      code: 0
    });
  };

  return res.json({user: req.session.userInfo});
});

router.post('/signup', (req, res) => {
  // TODO sign up
  let { studentId, password, name, email } = req.body;
  const redisClient = req.app.get('redisClient');
  const smtpTransport = req.app.get('smtpTransport');
  let passwordRegex = /^/;
  let nameRegex = /^/;

  User.findOne({student_id: studentId}, (err, exist) => {
    if (err) throw err;

    if (exist) {
      return res.status().json({
        error: "STUDENT_EXIST",
        code: 0
      });
    };

    if (password.length < 8 || typeof password !== "string" || !passwordRegex.test(password)) {
      return res.status(400).json({
        error: "BAD_PASSWORD",
        code: 1
      });
    };

    // TODO smart car track check
    
    let user = new User({student_id: studentId, password, name});
    user.password = user.generateHash(user.password);
    user.save((err) => {
      if (err) throw err;
    });

    let token = uuidV4();
    redisClient.set(token, studentId);
    let mailOptions = {
      from: config.mailer.from,
      to: email,
      subject: 'test',
      text: `test test ${token}`
    };

    smtpTransport.sendMail(mailOptions, (err, info) => {
      if (err) throw err;
      console.log('email sent to %s', email);
    });
    return res.json({success: true});
  });
});

router.post('/login', (req, res) => {
  let { studentId, password } = req.body;
  User.findOne({student_id: studentId}, (err, user) => {
    if (err) throw err;
    
    if (!user) {
      return res.status(400).json({
        error: "LOGIN_FAILED",
        code: 0
      });
    };

    if (!user.validateHash(password)) {
      return res.status(400).json({
        error: "LOGIN_FAILED",
        code: 0
      });
    };

    req.session.userInfo = {
      id: user._id,
      studentId
    };
    return res.json({success: true});
  });
});

router.post('/confirm', (req, res) => {
  const redisClient = req.app.get('redisClient');
  let token = req.query.token;
  redisClient.get(token, (err, reply) => {
    if (err) throw err;

    if (!reply) {
      return res.status(403).json({
        error: "FORBIDDEN",
        code: 0
      });
    };

    User.findOne({student_id: reply}, (err, user) => {
      user.confirmed = true;
      return res.json({success: true});
    });
  });

});

router.post('/logout', (req, res) => {
  req.session.destroy((err) => { if(err) throw err });
  return res.json({success: true});
});

export default router;
