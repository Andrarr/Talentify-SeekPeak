import jwt from 'jsonwebtoken';
import { ok, failure } from '../utils/ServiceRespose.util.js';

import { User } from '../model/Users.model.js';

const createRefreshToken = (id) => jwt.sign({ id }, `${process.env.REFRESH_TOKEN_SECRET}`, { expiresIn: '1d' });

export class RefreshTokenService {
    static refreshToken = async (req) => {
        const { email } = req.body;
        const foundUser = await User.findOne({ email: email });
        if (!foundUser) {
            return failure('User with that email not found', 404);
        }
        if (foundUser) {
            const refreshToken = createRefreshToken(foundUser._id);
            return ok(refreshToken);
        }
    };
}
