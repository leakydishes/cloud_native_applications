const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

console.log('environment    ', process.env.ENVIRONMENT)
console.log('PORT    ', process.env.PORT)
console.log('MONGO_CONNECTION_STRING    ', process.env.MONGO_CONNECTION_STRING)
if(process.env.ENVIRONMENT !== 'production') {
    require('dotenv').config()
}

const taskController = require('./controller/task.controller');

const app = express();
const port = process.env.PORT || 80;

// Serve frontend from public directory
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, './ui/build')));
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

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "./ui/build/index.html"));
});

app.listen(port, () => {
    console.log(`Server listening on the port  ${port}`);
})


// Connect to MongoDB
mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
    // Start the server after successful connection to MongoDB
    app.listen(port, '0.0.0.0', () => {
        console.log(`Server listening on port ${port}`);
    });
}).catch((err) => {
    console.error('Error connecting to MongoDB', err);
});
