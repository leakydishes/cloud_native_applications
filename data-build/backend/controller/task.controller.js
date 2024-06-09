const taskService = require('../service/task.service');

class TaskController {
    async getTasks(filters) {
        return await taskService.getTasks(task);
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
