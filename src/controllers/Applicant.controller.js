import { ApplicantService } from '../services/Applicant.service.js';
import { authenticateToken } from '../middleware/AuthToken.middleware.js';
import { roleAuthorization } from '../middleware/RoleAuth.middleware.js';
import { validation } from '../middleware/Validator.middleware.js';

import { Router } from 'express';

export const ApplicantController = Router();

ApplicantController.get('/query', [authenticateToken, roleAuthorization], async (req, res, next) => {
    try {
        const result = await ApplicantService.queryApplicant(req.query);
        res.status(result.statusCode).send(result.data);
    } catch (err) {
        next(err);
    }
})

    .post('/apply', [authenticateToken, validation('applicantValidation')], async (req, res, next) => {
        try {
            const result = await ApplicantService.newApplicant(req);
            res.status(result.statusCode).send(result.data);
        } catch (err) {
            next(err);
        }
    })

    .get('/applicants-by-email', [authenticateToken, roleAuthorization], async (req, res, next) => {
        try {
            const applicant = await ApplicantService.findByEmail(req.body.email);
            res.json(applicant);
        } catch (err) {
            next(err);
        }
    })

    .get('/applicants-by-departments', [authenticateToken, roleAuthorization], async (req, res, next) => {
        try {
            const result = await ApplicantService.filterByDepartment(req.body.department);
            res.status(result.statusCode).json(result.data);
        } catch (err) {
            next(err);
        }
    })

    .get('/', [authenticateToken, roleAuthorization], async (res, next) => {
        try {
            const allApplicants = await ApplicantService.findAll();
            res.json({ applicants: allApplicants });
        } catch (err) {
            next(err);
        }
    })

    .post('/approve-application', [authenticateToken, roleAuthorization], async (req, res, next) => {
        try {
            const { id, isApproved } = req.body;
            const result = await ApplicantService.approveApplicant(id, isApproved);
            res.status(result.statusCode).send(result.data);
        } catch (err) {
            next(err);
        }
    })

    .get('/evaluate-test', [authenticateToken, roleAuthorization], async (req, res, next) => {
        try {
            const result = await ApplicantService.testEvaluation(req.body.id);
            res.status(result.statusCode).send(result.data);
        } catch (err) {
            next(err);
        }
    })

    .get('/inform-applicant', [authenticateToken, roleAuthorization], async (req, res, next) => {
        try {
            const result = await ApplicantService.informApplicant(req.body.id);
            res.status(result.statusCode).send(result.data);
        } catch (err) {
            next(err);
        }
    })

    .post('/exams/:id', [authenticateToken, validation('applicantAnswersValidation')], async (req, res, next) => {
        try {
            const result = await ApplicantService.applicantsAnswers(req);
            res.status(result.statusCode).send(result.data);
        } catch (err) {
            next(err);
        }
    });
