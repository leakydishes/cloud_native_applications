const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '.env-dev') });

console.log('ENVIRONMENT:', process.env.ENVIRONMENT);
console.log('PORT:', process.env.PORT);
console.log('MONGO_CONNECTION_STRING:', process.env.MONGO_CONNECTION_STRING);

const taskController = require('./controller/task.controller');

const app = express();
const port = process.env.PORT || 3080;

// Serve frontend from public directory
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

// API routes
app.get('/api/tasks', (req, res) => {
    taskController.getTasks().then(data => res.json(data));
});

app.post('/api/task', (req, res) => {
    console.log(req.body);
    taskController.createTask(req.body.task).then(data => res.json(data));
});

app.put('/api/task', (req, res) => {
    taskController.updateTask(req.body.task).then(data => res.json(data));
});

app.delete('/api/task/:id', (req, res) => {
    taskController.deleteTask(req.params.id).then(data => res.json(data));
});

// Serve frontend from public directory
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Read the .pem certificate if it exists
let sslCA;
try {
    sslCA = fs.readFileSync(path.resolve(__dirname, 'mongo-cert.pem'));
} catch (err) {
    console.log('Certificate file not found, continuing without SSL');
}

// Connect to MongoDB
mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    sslCA: sslCA ? sslCA : undefined
}).then(() => {
    console.log('Connected to MongoDB');
    // Start the server after successful connection to MongoDB
    app.listen(port, '0.0.0.0', () => {
        console.log(`Server listening on port ${port}`);
    });
}).catch((err) => {
    console.error('Error connecting to MongoDB', err);
});
