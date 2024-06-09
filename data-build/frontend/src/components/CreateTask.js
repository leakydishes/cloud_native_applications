import React from 'react';
import { useForm } from "react-hook-form";
import { createTask } from '../services/TaskService';

export default function CreateTask(props) {

    const { register, handleSubmit } = useForm();
    const onSubmit = (data, e) => {
        createTask(data).then(response => {
            props.taskCreated();
            e.target.reset();
        });
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12 mrgnbtm">
                    <h2>Create Record</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row mrgnbtm">
                            <div className="form-group col-md-6">
                                <label htmlFor="census_year">Census Year</label>
                                <input {...register("census_year")} type="number" placeholder="Census Year" className="form-control" name="census_year" id="census_year" />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="location">Location</label>
                                <input {...register("location")} type="text" placeholder="Location" className="form-control" name="location" id="location" />
                            </div>
                        </div>
                        <div className="row mrgnbtm">
                            <div className="form-group col-md-6">
                                <label htmlFor="trading_name">Trading Name</label>
                                <input {...register("trading_name")} type="text" placeholder="Trading Name" className="form-control" name="trading_name" id="trading_name" />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="business_address">Business Address</label>
                                <input {...register("business_address")} type="text" placeholder="Business Address" className="form-control" name="business_address" id="business_address" />
                            </div>
                        </div>
                        <div className="row mrgnbtm">
                            <div className="form-group col-md-6">
                                <label htmlFor="industry_description">Industry Description</label>
                                <input {...register("industry_description")} type="text" placeholder="Industry Description" className="form-control" name="industry_description" id="industry_description" />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="latitude">Latitude</label>
                                <input {...register("latitude")} type="number" placeholder="Latitude" className="form-control" name="latitude" id="latitude" />
                            </div>
                        </div>
                        <div className="row mrgnbtm">
                            <div className="form-group col-md-6">
                                <label htmlFor="longitude">Longitude</label>
                                <input {...register("longitude")} type="number" placeholder="Longitude" className="form-control" name="longitude" id="longitude" />
                            </div>
                        </div>
                        <input type="submit" className="btn btn-danger mrgnbtm" />
                    </form>
                </div>
            </div>
        </div>
    );
}
