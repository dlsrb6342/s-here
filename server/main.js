import express from 'express';
import path from 'path';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import session from 'express-session'; 
import RedisStore from 'connect-redis';
import nodemailer from 'nodemailer';
import redis from 'redis';
import config from './config';
import api from './routes';

const app = express();
const port = 3000;
const devPort = 4000;

/* mongodb connection */
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => { 
  console.log('Connected to mongodb server'); 
});
const mongoUri = `${config.mongo.host}:${config.mongo.port}/${config.mongo.db}`
mongoose.connect(`mongodb://${config.mongo.user}:${config.mongo.password}@${mongoUri}`, {
  useMongoClient: true,
});

/* redis connection */
const redisStore = RedisStore(session);
const redisClient = redis.createClient(config.redis.port, config.redis.host, {auth_pass: config.redis.password, db: 5});
const redisConfig = {
  client: redisClient,
  ttl: 300,
}

/* session configuration */
app.use(session({
  store: new redisStore(redisConfig),
  secret: config.redis.secret,
  resave: false,
  saveUninitialized: true
}));

const smtpTransport = nodemailer.createTransport({
  host: config.mailer.host,
  port: 465,
  secure: true,
  auth: config.mailer.auth
});

app.set('smtpTransport', smtpTransport);
app.set('redisClient', redisClient);
app.use('/', express.static(path.join(__dirname, './../dist')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/api', api);


app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './../dist/index.html'));
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


app.listen(port, () => {
  console.log('Express is listening on port', port);
});
