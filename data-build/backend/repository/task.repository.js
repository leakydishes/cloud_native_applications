const { connect } = require('../config/db.config');
const { Task } = require('../model/task.model');
const logger = require('../logger/api.logger');

class TaskRepository {
    constructor() {
        connect();
    }

    async getTasks(filters = {}) {
        const query = {};
        if (filters.census_year) query.census_year = filters.census_year;
        if (filters.location) query.location = { $regex: filters.location, $options: 'i' };
        if (filters.industry_description) query.industry_description = { $regex: filters.industry_description, $options: 'i' };

        console.log('Query:', query);
        const tasks = await Task.find(query);
        console.log('Tasks:', tasks);
        return tasks;
    }

    async createTask(task) {
        let data = {};
        try {
            data = await Task.create(task);
        } catch (err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async updateTask(task) {
        let data = {};
        try {
            data = await Task.updateOne(task);
        } catch (err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async deleteTask(taskId) {
        let data = {};
        try {
            data = await Task.deleteOne({ _id: taskId });
        } catch (err) {
            logger.error('Error::' + err);
        }
        return { status: `${data.deletedCount > 0 ? true : false}` };
    }
}

module.exports = new TaskRepository();
