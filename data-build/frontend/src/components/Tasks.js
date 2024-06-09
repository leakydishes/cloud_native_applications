import React from 'react';
import EditTaskModal from './EditTaskModal';

export const Tasks = ({ tasks, deleteTask, taskEdited }) => {
    console.log('tasks length:::', tasks);
    if (tasks.length === 0) return null;

    const TaskRow = (task, index) => {
        return (
            <tr key={index} className={index % 2 === 0 ? 'odd' : 'even'}>
                <td>{task._id}</td>
                <td>{task.census_year}</td>
                <td>{task.location}</td>
                <td>{task.trading_name}</td>
                <td>{task.business_address}</td>
                <td>{task.industry_description}</td>
                <td>{task.latitude}</td>
                <td>{task.longitude}</td>
                <td>
                    <div className="row">
                        <div className="col-md-6">
                            <EditTaskModal task={task} taskEdited={taskEdited} />
                        </div>
                        <div className="col-md-6">
                            <button type="button" onClick={(e) => deleteTask(task._id)} className="btn btn-danger right">Delete</button>
                        </div>
                    </div>
                </td>
            </tr>
        );
    };

    const taskTable = tasks.map((task, index) => TaskRow(task, index));

    return (
        <div className="container">
            <h2>Tasks</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Task Id</th>
                        <th>Census Year</th>
                        <th>Location</th>
                        <th>Trading Name</th>
                        <th>Business Address</th>
                        <th>Industry Description</th>
                        <th>Latitude</th>
                        <th>Longitude</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {taskTable}
                </tbody>
            </table>
        </div>
    );
};
