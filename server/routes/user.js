import express from 'express';
import uuidV4 from 'uuid/v4';
import { User } from '../models';
import config from '../config';

const router = express.Router();

router.get('/', (req, res) => {
  if (typeof req.session.userInfo === "undefined") {
    return res.status(401).json({
      error: "NO_INFO",
      code: 0
    });
  };
  return res.json({ 
    name: req.session.userInfo.name,
    studentId: req.session.userInfo.studentId
  });
});

router.post('/signup', (req, res) => {
  let { studentId, password, name, email } = req.body;
  let passwordRegex = /^/;
  User.findOne({student_id: studentId}, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.status(400).json({
        error: "NOT_IN_LIST",
        code: 0
      });
    };
    if (user.active) {
      return res.status(400).json({
        error: "ALREADY_EXIST",
        code: 1
      });
    };
    if (password.length < 8 || typeof password !== "string" || !passwordRegex.test(password)) {
      return res.status(400).json({
        error: "BAD_PASSWORD",
        code: 2
      });
    };
    if (user.name !== name || user.email !== email) {
      return res.status(400).json({
        error: "BAD_INFORMATION",
        code: 3
      });
    };

    user.student_id = studentId;
    user.active = true;
    user.password = user.generateHash(password);
    user.save((err) => {
      if (err) throw err;
    });

    sendMail(studentId, email, req.app.get('redisClient'), req.app.get(smtpTransport));

    return res.json({ success: true });
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

    if (!user.active) {
      return res.status(403).json({
        error: "NOT_SIGNED",
        code: 1
      });
    };

    if (!user.validateHash(password)) {
      return res.status(400).json({
        error: "LOGIN_FAILED",
        code: 0
      });
    };

    if (!user.confirmed) {
      return res.json({
        success: false,
        studentId
      });
    } else {
      req.session.userInfo = {
        id: user._id,
        studentId,
        name: user.name
      };

      return res.json({
        success: true,
        name: user.name,
        studentId
      });
    };
  });
});

router.post('/confirm', (req, res) => {
  const redisClient = req.app.get('redisClient');
  let { token } = req.body;
  redisClient.get(token, (err, reply) => {
    if (err) throw err;

    if (!reply) {
      return res.status(403).json({
        error: "FORBIDDEN",
        code: 0
      });
    };

    User.findOne({student_id: reply}, (err, user) => {
      if (err) throw err;
      user.confirmed = true;
      user.save((err) => {
        if (err) throw err;
        redisClient.del(token);
        return res.json({success: true});
      });
    });
  });
});

router.post('/logout', (req, res) => {
  if (typeof req.session.userInfo === "undefined") {
    return res.status(400).json({
      error: "NOT_LOGGED_IN",
      code: 0
    });
  };

  req.session.destroy((err) => { 
    if(err) throw err;
    return res.json({success: true});
  });
});

router.post('/reconfirm', (req, res) => {
  let { studentId, password, email } = req.body;

  User.findOne({student_id: studentId}, (err, user) => {
    if (err) throw err;
    if (!user || !user.validateHash(password)) {
      return res.status(400).json({
        error: "AUTH_FAILED",
        code: 0
      });
    };

    if (!user.active) {
      return res.status(403).json({
        error: "NOT_SIGNED",
        code: 1
      });
    };

    sendMail(studentId, email, req.app.get('redisClient'), req.app.get(smtpTransport));
    return res.json({ success: true });
  });
});

router.post('/lostpw', (req, res) => {
  if (typeof req.session.userInfo === "undefined") {
    return res.status(401).json({
      error: "NO_INFO",
      code: 0
    });
  };

  let { studentId, email } = req.body;
  let redisClient = req.app.get('redisClient');
  let smtpTransport = req.app.get('smtpTransport');

  User.findOne({student_id: studentId}, (err, user) => {
    if (err) throw err;
    if (!user || user.email === email) {
      return res.status(400).json({
        error: "AUTH_FAILED",
        code: 0
      });
    };

    if (!user.active) {
      return res.status(403).json({
        error: "NOT_SIGNED",
        code: 1
      });
    };
    newPassword = uuidV4();
    user.password = user.generateHash(newPassword);
    let mailOptions = {
      from: config.mailer.from,
      to: email,
      subject: '스마트카 팩토리',
      text: `새로운 비밀번호입니다. ${newPassword}`
    }

    smtpTransport.sendMail(mailOptions, (err, info) => {
      if (err) throw err;
      user.save(err => {
        if (err) throw err;
        return res.json({ success: true });
      });
    });
  });
});

router.post('/changepw', (req, res) => {
  let { oldPassword, newPassword } = req.body;
  let passwordRegex = /^/;
  User.findById(req.session.userInfo._id, (err, user) => {
    if (err) throw err;
    if (!user || !user.validateHash(password)) {
      return res.status(400).json({
        error: "AUTH_FAILED",
        code: 0
      });
    };

    if (newPassword.length < 8 || typeof newPassword !== "string" || !passwordRegex.test(newPassword)) {
      return res.status(400).json({
        error: "BAD_PASSWORD",
        code: 1
      });
    };

    user.password = user.generateHash(newPassword);
    user.save(err => {
      if (err) throw err;
      return res.json({ success: true });
    });
  });
});

function sendMail(studentId, email, redisClient, smtpTransport) {
  let token = uuidV4();
  redisClient.set(token, studentId, 'EX', 60 * 60 * 4);
  let mailOptions = {
    from: config.mailer.from,
    to: email,
    subject: '스마트카 팩토리 이용 페이지의 인증메일입니다.',
    text: `www.shero.com/confirm?token=${token}`
  };

  smtpTransport.sendMail(mailOptions, (err, info) => {
    if (err) throw err;
    console.log('email sent to %s', email);
  });
};

export default router;
