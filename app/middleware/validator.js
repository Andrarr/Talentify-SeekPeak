import Joi from "joi"
import { Validators } from "../validation/index.js"

export const validation = (validator) => {
    console.log('validator', Validators.hasOwnProperty(validator))
    if (!Validators.hasOwnProperty(validator))
        throw new Error(`'${validator}' validator is not exist`)

    return async function (req, res, next) {
        try {
            const validated = await Validators[validator].validateAsync(req.body)
            req.body = validated
            next()
        } catch (err) {
            return res.send(422, { message: err.message })
        }
    }
}