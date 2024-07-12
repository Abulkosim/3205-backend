import {Request, Response} from 'express';
import {validationResult} from 'express-validator';
import {findUsers} from '../services/userService';

export const searchUsers = (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {email, number} = req.body;

    setTimeout(() => {
        const users = findUsers(email, number);
        res.json(users);
    }, 5000);
};