import { ExamService } from '../services/Exam.service.js';

import { authenticateToken } from '../middleware/AuthToken.middleware.js';
import { roleAuthorization } from '../middleware/RoleAuth.middleware.js';
import { validation } from '../middleware/Validator.middleware.js';

import { Router } from 'express';

export const ExamController = Router();

ExamController.get('/', [(authenticateToken, roleAuthorization)], async (req, res, next) => {
    try {
        const result = await ExamService.findAll();
        res.send(result.data);
    } catch (err) {
        next(err);
    }
})

    .get('/:id', [authenticateToken, roleAuthorization], async (req, res, next) => {
        try {
            const id = req.params.id;
            const result = await ExamService.findById(id);
            res.status(result.statusCode).json(result.data);
        } catch (err) {
            next(err);
        }
    })

    .post('/', [authenticateToken, roleAuthorization, validation('examSchema')], async (req, res, next) => {
        try {
            const result = await ExamService.createExam(req);
            res.status(result.statusCode).json(result.data);
        } catch (err) {
            next(err);
        }
    })

    .patch(
        '/:id',
        [authenticateToken, roleAuthorization, validation('examUpdateValidation')],
        async (req, res, next) => {
            try {
                const result = await ExamService.updateExam(req);
                res.status(result.statusCode).send(result.data);
            } catch (err) {
                next(err);
                console.log(err);
            }
        }
    )

    .delete(
        '/:id',
        [authenticateToken, roleAuthorization, validation('examUpdateValidation')],
        async (req, res, next) => {
            try {
                const id = req.params.id;
                const result = await ExamService.deleteExam(id);
                res.status(result.statusCode).json(result.data);
            } catch (err) {
                next(err);
            }
        }
    )

    .get('/exams-by-departments', [authenticateToken, roleAuthorization], async (req, res, next) => {
        try {
            const result = await ExamService.queryExam(req);
            res.status(result.statusCode).json(result.data);
        } catch (err) {
            next(err);
        }
    })

    .get('/:id/questions', authenticateToken, async (req, res, next) => {
        try {
            const result = await ExamService.getExamQuestions(req);
            res.status(result.statusCode).send(result.data);
        } catch (err) {
            next(err);
        }
    });
