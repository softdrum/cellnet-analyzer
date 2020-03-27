const {User} = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignUser(user) {
    return jwt.sign(user, config.auth.jwtSecret, {
        expiresIn: config.auth.expiresIn
    })
}
module.exports = {
    async register (req, res) {
        try {
            const user = await User.create(req.body)
            const userJSON = user.toJSON()
            res.send({
                user: userJSON,
                token: jwtSignUser(userJSON)
            })
        } catch (error) {
            console.log(`Error ${error}`);
            res.status(400).send({
                error: 'This email already in use'
            })
        }
    },
    async login (req, res) {
        try {
            const {email, password} = req.body
            const user = await User.findOne({
                where: {
                    email: email
                }
            })
            console.log(`User: ${user}`)
            const isPasswordValid = await user.comparePassword(password)
            if (user && isPasswordValid) {
                    const userJSON = user.toJSON()
                    res.send({
                        user: userJSON,
                        token: jwtSignUser(userJSON)
                    })
            } else {
                res.status(403).send({
                    error: "The login information is incorrect"
                })
            }
        } catch (error) {
            console.log(`Error: ${error}`);
            res.status(500).send({
                error: 'An error has occured trying to log in'
            })
        }
    }
}