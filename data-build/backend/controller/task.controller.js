const taskService = require('../service/task.service');

class TaskController {
    // async getTasks(filters) {
    //     return await taskService.getTasks(filters);
    // }
    async getTasks(req, res) {
        try {
            const tasks = await taskService.getTasks();
            res.json(tasks);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
    async createTask(req, res) {
        try {
            const task = await taskService.createTask(req.body.task);
            res.json(task);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async updateTask(req, res) {
        try {
            const task = await taskService.updateTask(req.body.task);
            res.json(task);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async deleteTask(req, res) {
        try {
            const result = await taskService.deleteTask(req.params.id);
            res.json(result);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
}

module.exports = new TaskController();