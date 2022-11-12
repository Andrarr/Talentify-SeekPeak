import Joi from "joi";

export const signUpValidation = Joi.object().keys({
    email: Joi.string().email().trim().required(),
    name: Joi.string().alphanum().min(2).max(30).required(),
    surname: Joi.string().alphanum().required(),
    birthday: Joi.date().max("01-01-2004").messages({ "date.format": `Date format is YYYY-MM-DD`, "date.max": `Age must be 18+` }),
    password: Joi.string().min(6).max(12).trim().required(),
    "confirm-password": Joi.string().equal(Joi.ref("password")).messages({ "any.only": "password does not match" }).required(),
    country: Joi.string().max(2).message("message: Country should be only two characters").required(),
    gender: Joi.string().valid("Female", "Male", "Others").required(),
    department: Joi.string().required(),
});

export const signUpAdminValidation = Joi.object().keys({
    email: Joi.string().email().trim().required(),
    name: Joi.string().alphanum().min(2).max(30).required(),
    surname: Joi.string().alphanum().required(),
    birthday: Joi.date().max("01-01-2004").messages({ "date.format": `Date format is YYYY-MM-DD`, "date.max": `Age must be 18+` }),
    password: Joi.string().min(6).max(12).trim().required(),
    "confirm-password": Joi.string().equal(Joi.ref("password")).messages({ "any.only": "password does not match" }).required(),
    country: Joi.string().max(2).message("message: Country should be only two characters").required(),
    gender: Joi.string().valid("Female", "Male", "Others").required(),
    department: Joi.string().required(),
    role: Joi.string().required()
});

export const departmentValidation = Joi.object().keys({
    department: Joi.string().required()
})

export const examSchema = Joi.object().keys({
    departmentsId: Joi.required(),
    createdBy: Joi.string().required(),
    questions: Joi.required()
})

const customMethod = (value, helpers) => {
    const file = value
    console.log(file)
    console.log(file.mimetype)
    const allowedFileTypes = ["image/png", "image/jpeg", "image/jpg"]

    if (!(allowedFileTypes.includes(file.mimetype))) {
        return new Error("not the right type of file!")
    }
    return value
}

export const applicantValidation = Joi.object().keys({ document: Joi.custom(customMethod, "custom validation") })
