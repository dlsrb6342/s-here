import express from 'express';
import user from './user';
import reserve from './reserve';
import item from './item';
import remote from './remote';

const router = express.Router();
router.use('/user', user);
router.use('/reserve', reserve);
router.use('/item', item);
router.use('/remote', remote);

export default router;
