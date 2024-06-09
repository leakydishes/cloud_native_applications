const taskRepository = require('../repository/task.repository');

class TaskService {
    async getTasks(filters) {
        return await taskRepository.getTasks(filters);
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
