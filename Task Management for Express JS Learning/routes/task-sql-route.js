const express = require("express");
const router = express.Router();
const db = require("../db/index.js");

router.get("/", async (req, res) => {
    try {
        let result = await db.query("SELECT * FROM tasks");
        result = result?.rows;
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get("/:id", async (req, res) => {
    try {
        let result = await db.query("SELECT * FROM tasks WHERE id = $1", [req.params.id]);
        result = result ?.rows;
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post("/", async (req, res) => {
    try {
        let newTask = req.body;
        let { name, is_completed } = newTask;

        if (newTask?.name == null) {
            return res.status(400).send("Task has no name");
        }
        if (newTask?.is_completed == null) {
            return res.status(400).send("Task has no is_completed")
        } 

        const result = await db.query("INSERT INTO tasks (name, is_completed) VALUES ($1, $2) RETURNING *", [name, is_completed]);

        res.status(200).send(result?.rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const newTask = req.body;
        let result = null;

        if (newTask?.name == null && newTask?.is_completed) {
            return res.status(400).send("No name and is_completed in the task");
        }
        if (newTask?.name != null) {
            result = await db.query("UPDATE tasks SET name = $1 WHERE id = $2 RETURNING *", [newTask.name, req.params.id]);
        }
        if (newTask?.is_completed) {
            result = await db.query("UPDATE tasks SET is_completed = $1 WHERE id = $2 RETURNING *", [newTask.is_completed, req.params.id]);
        }

        res.status(200).send(result?.rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const result = await db.query("DELETE FROM tasks WHERE id = $1", [req.params.id]);

        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = {
    router: router
};