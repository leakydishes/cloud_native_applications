// const taskService = require('../service/task.service');

// class TaskController {
//     async getTasks(filters) {
//         return await taskService.getTasks(filters);
//     }

//     async createTask(task) {
//         return await taskService.createTask(task);
//     }

//     async updateTask(task) {
//         return await taskService.updateTask(task);
//     }

//     async deleteTask(taskId) {
//         return await taskService.deleteTask(taskId);
//     }
// }

// module.exports = new TaskController();


const taskService = require('../service/task.service');
const logger = require('../logger/api.logger');

class TaskController {
    async getTasks(req, res) {
        try {
            const filters = req.query;
            const tasks = await taskService.getTasks(filters);
            res.json(tasks);
        } catch (err) {
            logger.error('Error in getTasks:', err);
            res.status(500).send('Error in getting tasks');
        }
    }

    async createTask(req, res) {
        try {
            const task = req.body.task;
            const newTask = await taskService.createTask(task);
            res.json(newTask);
        } catch (err) {
            logger.error('Error in createTask:', err);
            res.status(500).send('Error in creating task');
        }
    }

    async updateTask(req, res) {
        try {
            const task = req.body.task;
            const updatedTask = await taskService.updateTask(task);
            res.json(updatedTask);
        } catch (err) {
            logger.error('Error in updateTask:', err);
            res.status(500).send('Error in updating task');
        }
    }

    async deleteTask(req, res) {
        try {
            const taskId = req.params.id;
            const status = await taskService.deleteTask(taskId);
            res.json(status);
        } catch (err) {
            logger.error('Error in deleteTask:', err);
            res.status(500).send('Error in deleting task');
        }
    }
}

module.exports = new TaskController();
