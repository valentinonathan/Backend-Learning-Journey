const { create } = require("domain");
const fs = require("fs/promises");

async function taskParser() {
    const text = await fs.readFile("./data/task-database.json", "utf-8");
    const tasks = JSON.parse(text)?.tasks;
    return tasks;
}

async function getTaskById(id) {
    const tasksJSON = await taskParser();

    if (tasksJSON.length == 0) return null;

    let taskByIndex = null;
    let index = null;

    for (let i = 0; i < tasksJSON.length; ++i) {
        if (tasksJSON[i]?.id == id) {
            taskByIndex = tasksJSON[i];
            index = i;
        }
    }

    return {task: taskByIndex, index: index};
}

async function createTask(req, res) {
    try {
        let newTask = req.body;
        let tasks = await taskParser();
        newTask = {id: tasks?.length + 1, name: newTask?.name, is_completed: newTask?.is_completed};

        tasks?.push(newTask);

        await fs.writeFile("./data/task-database.json", JSON.stringify({"tasks": tasks}, null, 2));
        
        res.sendStatus(201);
    }
    catch (error) {
        res.status(500).send(error?.message);
    }
}

async function updateTask(req, res) {
    const newTask = req.body;

    if (newTask?.name == null && newTask?.is_completed == null) {
        throw new Error("Bad request format");
    } 

    let { task, index } = await getTaskById(req.params.id);
    let tasks = await taskParser();

    console.log(index);
    if (task == null) {
        throw new Error("Task does not exist");
    }

    if (newTask?.name != null) {
        task.name = newTask.name;
        tasks[index] = task;

        await fs.writeFile("./data/task-database.json", JSON.stringify({"tasks": tasks}, null, 2));
    } 
    if (newTask?.is_completed != null) {
        task.is_completed = newTask.is_completed;
        tasks[index] = task;

        await fs.writeFile("./data/task-database.json", JSON.stringify({"tasks": tasks}, null, 2));
    }

}

module.exports = {
    taskParser: taskParser,
    getTaskById: getTaskById,
    createTask: createTask,
    updateTask: updateTask
}