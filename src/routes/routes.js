import express from 'express';

import { ApplicantController } from '../controllers/Applicant.controller.js';
import { DepartmentController } from '../controllers/Department.controller.js';
import { ExamController } from '../controllers/Exam.controller.js'
import { AuthController } from '../controllers/Auth.controller.js'
import { UserController } from '../controllers/User.controller.js'; 
import { PublicFolderController } from '../controllers/PublicFolder.controller.js'
import { refreshToken as refreshController} from '../controllers/RefreshToken.controller.js';

export function routes(app) {
    const route = [
        ['applicants', ApplicantController],
        ['departments', DepartmentController],
        ['exams', ExamController],
        ['auth', AuthController],
        ['refresh-token', refreshController],
        ['public-folder', PublicFolderController],
        ['users', UserController],
    ]

    route.forEach((item) => {
        const [route, controller] = item;
        app.use(`/api/${route}`, controller);
    })

}
