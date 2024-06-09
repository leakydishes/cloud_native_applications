const taskRepository = require('../repository/task.repository');

class TaskService {
    async getTasks(tasks) {
        return await taskRepository.getTasks(task);
    }

    async createTask(task) {
        return await taskRepository.createTask(task);
    }

    async updateTask(task) {
        return await taskRepository.updateTask(task);
    }

    async deleteTask(taskId) {
        return await taskRepository.deleteTask(taskId);
    }
}

module.exports = new TaskService();
