import { signUpValidation } from "./validation.js"
import { signInValidation } from "./validation.js"
import { createAdminValidation } from "./validation.js"
import { departmentValidation } from "./validation.js"
import { applicantValidation } from "./validation.js"
import { examSchema } from "./validation.js"
import { approvedApplication } from "./validation.js"
import { applicantAnswersValidation } from "./validation.js"
import { departmentUpdateValidation } from "./validation.js"
import { examUpdateValidation } from "./validation.js"

export const Validators = {
    signUpValidation,
    createAdminValidation,
    signInValidation,
    departmentValidation,
    examSchema,
    applicantValidation,
    applicantAnswersValidation,
    approvedApplication,
    departmentUpdateValidation,
    examUpdateValidation
}
