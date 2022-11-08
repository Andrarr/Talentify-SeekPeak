import { roles } from "../utils/inputs.js"

export const roleAuthorization = function (req, res, next) {
    switch (req.auth.role) {
        case roles.TEAMLEADER:
        case roles.CTO:
        case roles.ADMIN:
        case roles.SUPER_ADMIN:
            next()
            break;
        default: res.status(403).send({ message: "You don't have authority for this action!" })
            console.log("You don't have authority for this action!")
            break;
    }
}

export const roleSuperAdmin = function (req, res, next) {
    switch (req.auth.role) {
        case roles.SUPER_ADMIN:
        case roles.CTO:
            next()
            break;
        default: res.status(403).send({ message: "Only a super-admin/ CTO has access!" })
            console.log("Only a super-admin/ CTO has access!")
            break;
    }
}
