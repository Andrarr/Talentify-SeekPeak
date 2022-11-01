import { User } from "../model/users.js";

export const roleAuthorization = function (req, res, next) {
    let authHeader = req.headers['authorization']
    let token = authHeader && authHeader.split(" ")[1]

    if (token == null) {
        return res.sendStatus(401)
    }
    try {
        if (req.role == "admin" || req.role == "teamLeader") {
            next()
        } else {
            res.status(403).send({ message: "You don't have authority for this action!" })
        }
    }
    catch (err) {
        res.send({ message: err.message })
    }

}
