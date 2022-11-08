import Joi from 'joi';


export const signUpValidationSchema = Joi.object().keys({
    email: Joi.string().email().trim().required(),
    name: Joi.string().alphanum().min(2).max(30).required(),
    surname: Joi.string().alphanum().required(),
    birthday: Joi.date().max("01-01-2004").messages({ 'date.format': `Date format is YYYY-MM-DD`, 'date.max': `Age must be 18+` }),
    password: Joi.string().min(6).max(12).trim().required(),
    confirmPassword: Joi.string().equal(Joi.ref('password')).messages({ 'any.only': 'password does not match' }).required(),
    country: Joi.string().max(2).message("message: Country should be only two characters").required(),
    gender: Joi.string().valid('female', 'male','Female', 'Male', 'others').required(),
    department: Joi.string().required(), 
});

export const newDepartmentSchema = Joi.object().keys({
    department: Joi.string().required()
})


