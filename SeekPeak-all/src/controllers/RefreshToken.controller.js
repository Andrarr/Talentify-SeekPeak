import { RefreshTokenService } from '../services/RefreshToken.service.js';

export const refreshToken = async (req, res) => {
    try {
        const result = await RefreshTokenService.refreshToken(req);
        res.status(result.statusCode).json(result.data);
    } catch (err) {
        res.status(result.statusCode).send(err.message);
    }
}