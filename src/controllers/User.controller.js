import { Router } from 'express';
import { UserService } from '../services/User.service.js';
import { roleAuthorization } from '../middleware/RoleAuth.middleware.js';
import { authenticateToken } from '../middleware/AuthToken.middleware.js';
import { validation } from '../middleware/Validator.middleware.js';

export const UserController = Router();

UserController.put('/:id', [authenticateToken, roleAuthorization], async (req, res, next) => {
  try {
    const result = await UserService.updateUserRole(req);
    res.status(result.statusCode).json(result.data);
  } catch (err) {
    next(err);
  }
})
.post(
  '/user-admin',
  [authenticateToken, roleAuthorization, validation('createAdminValidation')],
  async (req, res, next) => {
    try {
      const result = await UserService.createAdmin(req);
      res.status(result.statusCode).json(result.data);
    } catch (err) {
      next(err);
    }
  }
);
