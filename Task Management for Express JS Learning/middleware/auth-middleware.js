const jwt = require("jsonwebtoken");
const db = require("../db/index.js")

async function authenticateUser(req, res, next) {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).send("Not authenticated")
        }
        let payload = null;
        try {
            payload = jwt.verify(token, "Password");
        } catch (error) {
            return res.status(401).send(error.message);
        }
        req.user = payload;
        console.log(payload);
        next();
    } catch (error) {
        res.status(500).send(error.message);
    }   
}

module.exports = {authenticateUser: authenticateUser};