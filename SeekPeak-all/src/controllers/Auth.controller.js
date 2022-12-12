import { authenticateToken } from '../middleware/AuthToken.middleware.js';
import { Router } from 'express';
import { validation } from '../middleware/Validator.middleware.js';
import { AuthService } from '../services/Auth.service.js';

export const AuthController = Router();

AuthController.post('/sign-in', validation('signInValidation'), async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const result = await AuthService.signIn(email, password);
        res.status(result.statusCode).json(result.data);
    } catch (err) {
        next(err);
    }
})

    .post('/sign-up', validation('signUpValidation'), async (req, res, next) => {
        try {
            const result = await AuthService.signUp(req);
            res.status(result.statusCode).send(result.data);
        } catch (err) {
            next(err);
        }
    })

    .post('/log-out', authenticateToken, async (req, res, next) => {
        try {
            const result = await AuthService.logOut(req.auth._id);
            res.send(result.data);
        } catch (err) {
            next(err);
        }
    });
