const express = require("Express");
const router = express.Router();
const db = require("../db/index.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.post("/", async (req, res) => {
    try {
        let username = req.body?.username;
        let password = req.body?.password;

        if (username == null || password == null) {
            return res.status(400).send("Either username or password is missing");
        }

        let result = await db.query("SELECT * FROM users WHERE username = $1", [username]);
        result = result?.rows;

        if (result?.length == 0) {
            return res.status(400).send("Username not found");
        }
        if (result[0].password == password) {
            const token = jwt.sign({username: username}, process.env.JWT_PASSWORD, {expiresIn:"1h"});
            res.cookie("token", token);
            return res.status(200).send("You are authorized");
        } else {
            return res.status(401).send("Password is incorrect");
        }

    } catch (error) {
        res.status(500).send(error.message);
    }

});

module.exports = {
    router: router
};