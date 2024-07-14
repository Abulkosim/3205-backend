import {Request, Response} from 'express';
import {validationResult} from 'express-validator';
import {findUsers} from '../services/userService';
import {AbortController} from 'abort-controller';

const activeRequests = new Map<string, AbortController>();

export const searchUsers = (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {email, number} = req.body;
    const requestKey = email;

    if (activeRequests.has(requestKey)) {
        const previousController = activeRequests.get(requestKey);
        if (previousController) {
            previousController.abort();
        }
    }

    const controller = new AbortController();
    activeRequests.set(requestKey, controller);

    const timeoutId = setTimeout(() => {
        if (!controller.signal.aborted) {
            const users = findUsers(email, number);
            res.json(users);
            activeRequests.delete(requestKey);
        }
    }, 5000);

    controller.signal.addEventListener('abort', () => {
        clearTimeout(timeoutId);
        res.status(499).json({error: 'Request was canceled'});
    });
};