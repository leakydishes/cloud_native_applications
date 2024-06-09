import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from "react-hook-form";
import { editTask } from '../services/TaskService';

export default function EditTaskModal({ task, taskEdited }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        editTask(data).then(response => {
            taskEdited(response);
            setShow(false);
        });
    };

    return (
        <>
            <Button variant="warning" onClick={handleShow}>
                Edit
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Dashboard Edit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="form-group col-md-3">
                                <label htmlFor="taskId">Id</label>
                                <input {...register("id")} type="text" className="form-control" defaultValue={task.id} name="id" id="id" disabled />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col-md-6">
                                <label htmlFor="census_year">Census Year</label>
                                <input {...register("census_year")} type="number" className="form-control" defaultValue={task.census_year} name="census_year" id="census_year" placeholder="Census Year" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col-md-6">
                                <label htmlFor="location">Location</label>
                                <input {...register("location")} type="text" className="form-control" defaultValue={task.location} name="location" id="location" placeholder="Location" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col-md-6">
                                <label htmlFor="trading_name">Trading Name</label>
                                <input {...register("trading_name")} type="text" className="form-control" defaultValue={task.trading_name} name="trading_name" id="trading_name" placeholder="Trading Name" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col-md-6">
                                <label htmlFor="business_address">Business Address</label>
                                <input {...register("business_address")} type="text" className="form-control" defaultValue={task.business_address} name="business_address" id="business_address" placeholder="Business Address" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col-md-6">
                                <label htmlFor="industry_description">Industry Description</label>
                                <input {...register("industry_description")} type="text" className="form-control" defaultValue={task.industry_description} name="industry_description" id="industry_description" placeholder="Industry Description" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col-md-6">
                                <label htmlFor="latitude">Latitude</label>
                                <input {...register("latitude")} type="number" className="form-control" defaultValue={task.latitude} name="latitude" id="latitude" placeholder="Latitude" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col-md-6">
                                <label htmlFor="longitude">Longitude</label>
                                <input {...register("longitude")} type="number" className="form-control" defaultValue={task.longitude} name="longitude" id="longitude" placeholder="Longitude" />
                            </div>
                        </div>
                        <div className="btncenter">
                            <input type="submit" className="btn btn-danger" />
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}
