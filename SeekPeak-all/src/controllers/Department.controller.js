import { Router } from 'express';

import { DepartmentService } from '../services/Department.service.js';
import { authenticateToken } from '../middleware/AuthToken.middleware.js';
import { roleAuthorization } from '../middleware/RoleAuth.middleware.js';
import { validation } from '../middleware/Validator.middleware.js';

export const DepartmentController = Router();

DepartmentController.post(
    '/',
    [authenticateToken, roleAuthorization, validation('departmentValidation')],
    async (req, res, next) => {
        try {
            const result = await DepartmentService.createDepartment(req.body);
            res.status(result.statusCode).send(result.data);
        } catch (err) {
            next(err);
        }
    }
)
    .get('/', authenticateToken, async (res, next) => {
        try {
            const result = await DepartmentService.allDepartments();
            res.status(result.statusCode).send(result.data);
        } catch (err) {
            next(err);
        }
    })
    .delete('/:id', [authenticateToken, roleAuthorization], async (req, res, next) => {
        try {
            const result = await DepartmentService.deleteById(req.params.id);
            res.status(result.statusCode).json(result.data);
        } catch (err) {
            next(err);
        }
    })

    .get('/:id', authenticateToken, async (req, res, next) => {
        try {
            const result = await DepartmentService.findById(req.params.depId);
            res.status(result.statusCode).json(result.data);
        } catch (err) {
            next(err);
        }
    })

    .patch('/:id', [authenticateToken, roleAuthorization], async (req, res, next) => {
        try {
            const result = await DepartmentService.updateById(req.params.id, req.body);
            res.status(result.statusCode).json(result.data);
        } catch (err) {
            next(err);
        }
    });
