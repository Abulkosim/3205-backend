import express from 'express';
import {check} from 'express-validator';
import {searchUsers} from '../controllers/userController';

const router = express.Router();

router.post('/search', [
    check('email').isEmail().withMessage('Invalid email')
], searchUsers);

export default router;