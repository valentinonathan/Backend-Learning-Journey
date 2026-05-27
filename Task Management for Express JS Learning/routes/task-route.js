const express = require("express");
const router = express.Router();
const taskMiddleware = require("../middleware/task-middleware");

router.get("/", (req, res) => {
    async function getTasks() {
        const tasks = await taskMiddleware.taskParser();
        res.send(tasks);
    }
    getTasks();
});

router.post("/", async (req, res) => {
    const task = req.body;

    if (task == null) {
        return res.status(400).json({
            message: "Task is null"
        });
    } 
    if (task?.name == null || task?.is_completed == null) {
        return res.status(400).json({
            message: "Bad task format"
        })
    }
    taskMiddleware.createTask(req, res);
});

router.get("/:id", (req, res) => {
    async function getTaskByIdAsync(id) {
        let task = await taskMiddleware.getTaskById(id);
        task = task.task;
        if (task == null) {
            res.sendStatus(404);
        } else {
            res.send(task);
        }
    }
    getTaskByIdAsync(req.params.id);
});

router.patch("/:id", async (req, res) => {
    try {
        await taskMiddleware.updateTask(req, res);
        res.sendStatus(200);
    } catch(error) {
        if (error?.message == "Bad request format" || error?.message == "Task does not exist") {
            res.status(400).send(error.message);
        } else {
            res.status(500).send(error.message);
        }
    }
});

module.exports = {
    router: router
};