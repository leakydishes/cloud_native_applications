import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({
    census_year: '',
    location: '',
    trading_name: '',
    business_address: '',
    industry_description: '',
    latitude: '',
    longitude: ''
  });

  const fetchTasks = useCallback(() => {
    axios.get('/api/tasks', { params: formData })
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the tasks!', error);
      });
  }, [formData]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchTasks();
  };

  return (
    <div className="container">
      <h2 className="mt-4">Dashboard</h2>
      <div className="card mt-4">
        <div className="card-header">Create and Filter Records</div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="census_year" className="form-label">Census Year</label>
              <input type="number" className="form-control" id="census_year" name="census_year" value={formData.census_year} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="location" className="form-label">Location</label>
              <input type="text" className="form-control" id="location" name="location" value={formData.location} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="trading_name" className="form-label">Trading Name</label>
              <input type="text" className="form-control" id="trading_name" name="trading_name" value={formData.trading_name} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="business_address" className="form-label">Business Address</label>
              <input type="text" className="form-control" id="business_address" name="business_address" value={formData.business_address} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="industry_description" className="form-label">Industry Description</label>
              <input type="text" className="form-control" id="industry_description" name="industry_description" value={formData.industry_description} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="latitude" className="form-label">Latitude</label>
              <input type="number" step="any" className="form-control" id="latitude" name="latitude" value={formData.latitude} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="longitude" className="form-label">Longitude</label>
              <input type="number" step="any" className="form-control" id="longitude" name="longitude" value={formData.longitude} onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-primary">Create/Filter</button>
          </form>
        </div>
      </div>

      <div className="mt-4">
        <h2>Task List</h2>
        <div className="list-group">
          {tasks.map(task => (
            <div key={task._id} className="list-group-item">
              <h5 className="mb-1">{task.trading_name}</h5>
              <p className="mb-1">{task.business_address}</p>
              <small>{task.census_year} - {task.location} - {task.industry_description} - Lat: {task.latitude} - Long: {task.longitude}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
