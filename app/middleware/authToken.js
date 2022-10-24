import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()



export const authenticateToken = function (req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1] //since we wanna get the second parameter of that array, array t authHeader

    // if we have an authHeader then take it and split, if not just return undefined
    if (token == null) return res.sendStatus(401) // here if there is no token, it sends a status

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, member) => {
        if (err) return res.sendStatus(403)// the token no longer valid 
        req.member = member
        next()
    })
}

