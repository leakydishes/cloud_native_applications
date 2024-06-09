import React from "react";

export default class AddData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      census_year: '',
      block_id: '',
      property_id: '',
      base_property_id: '',
      clue_small_area: '',
      trading_name: '',
      business_address: '',
      industry_anzsic4_code: '',
      industry_anzsic4_description: '',
      longitude: '',
      latitude: ''
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { census_year, block_id, property_id, base_property_id, clue_small_area, trading_name, business_address, industry_anzsic4_code, industry_anzsic4_description, longitude, latitude } = this.state;

    const data = {
      census_year: parseInt(census_year),
      block_id: parseInt(block_id),
      property_id: parseInt(property_id),
      base_property_id: parseInt(base_property_id),
      clue_small_area: clue_small_area.split(',').map(item => item.trim()),
      trading_name: trading_name.split(',').map(item => item.trim()),
      business_address: business_address.split(',').map(item => item.trim()),
      industry_anzsic4_code: parseInt(industry_anzsic4_code),
      industry_anzsic4_description: industry_anzsic4_description.split(',').map(item => item.trim()),
      longitude: parseFloat(longitude),
      latitude: parseFloat(latitude)
    };

    this.props.handleAddData(data);
    this.setState({
      census_year: '',
      block_id: '',
      property_id: '',
      base_property_id: '',
      clue_small_area: '',
      trading_name: '',
      business_address: '',
      industry_anzsic4_code: '',
      industry_anzsic4_description: '',
      longitude: '',
      latitude: ''
    });
  };

  render() {
    return (
      <form noValidate onSubmit={this.handleSubmit} className="new-data form-group">
        <input type="number" name="census_year" placeholder="Census Year" value={this.state.census_year} onChange={this.handleChange} className="form-control" required />
        <input type="number" name="block_id" placeholder="Block ID" value={this.state.block_id} onChange={this.handleChange} className="form-control" required />
        <input type="number" name="property_id" placeholder="Property ID" value={this.state.property_id} onChange={this.handleChange} className="form-control" required />
        <input type="number" name="base_property_id" placeholder="Base Property ID" value={this.state.base_property_id} onChange={this.handleChange} className="form-control" required />
        <input type="text" name="clue_small_area" placeholder="Clue Small Area" value={this.state.clue_small_area} onChange={this.handleChange} className="form-control" required />
        <input type="text" name="trading_name" placeholder="Trading Name" value={this.state.trading_name} onChange={this.handleChange} className="form-control" required />
        <input type="text" name="business_address" placeholder="Business Address" value={this.state.business_address} onChange={this.handleChange} className="form-control" required />
        <input type="number" name="industry_anzsic4_code" placeholder="Industry ANZSIC4 Code" value={this.state.industry_anzsic4_code} onChange={this.handleChange} className="form-control" required />
        <input type="text" name="industry_anzsic4_description" placeholder="Industry ANZSIC4 Description" value={this.state.industry_anzsic4_description} onChange={this.handleChange} className="form-control" required />
        <input type="number" name="longitude" placeholder="Longitude" value={this.state.longitude} onChange={this.handleChange} className="form-control" required />
        <input type="number" name="latitude" placeholder="Latitude" value={this.state.latitude} onChange={this.handleChange} className="form-control" required />
        <button className="btn btn-primary" type="submit">Add Data</button>
      </form>
    );
  }
}
