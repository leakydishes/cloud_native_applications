const taskService = require('../service/task.service');

class TaskController {
    // async getTasks(filters) {
    //     return await taskService.getTasks(filters);
    // }
    async getTasks(req, res) {
        const tasks = await taskService.getTasks();
        res.json(tasks);
    }

    async createTask(task) {
        return await taskService.createTask(task);
    }

    async updateTask(task) {
        return await taskService.updateTask(task);
    }

    async deleteTask(taskId) {
        return await taskService.deleteTask(taskId);
    }
}

module.exports = new TaskController();
