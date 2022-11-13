import Joi from "joi"
import { Validators } from "../validation/index.js"

export const validation = (validator) => {
    if (!Validators.hasOwnProperty(validator))
        throw new Error(`"${validator}" validator does not exist`)

    return async function (req, res, next) {
        try {
            const validated = await Validators[validator].validateAsync(req.body)
            req.body = validated
            next()
        } catch (err) {
            return res.status(422).send({ message: err.message })
        }
    }
}