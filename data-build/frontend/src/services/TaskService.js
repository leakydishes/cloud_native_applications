import axios from 'axios';

// Fetch all tasks with optional filters
export async function getAllTasks(filters = {}) {
    try {
        const response = await axios.get('/api/tasks', { params: filters });
        return response.data;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
    }
}

// Create a new task
export async function createTask(data) {
    try {
        const response = await axios.post('/api/task', { task: data });
        return response.data;
    } catch (error) {
        console.error('Error creating task:', error);
        throw error;
    }
}

// Delete a task by ID
export async function deleteTask(taskId) {
    try {
        const response = await axios.delete(`/api/task/${taskId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting task:', error);
        throw error;
    }
}

// Update a task
export async function editTask(data) {
    try {
        const response = await axios.put('/api/task', { task: data });
        return response.data;
    } catch (error) {
        console.error('Error updating task:', error);
        throw error;
    }
}
