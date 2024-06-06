import React from "react";

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      census_year: "",
      clue_small_area: "",
      industry_anzsic4_description: "",
      filteredData: this.props.data // Store filtered data separately
    };
  }

  handleFilterChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  applyFilters = () => {
    const { census_year, clue_small_area, industry_anzsic4_description } = this.state;
    const filteredData = this.props.data.filter(item => {
      return (
        (census_year ? item.census_year === parseInt(census_year) : true) &&
        (clue_small_area ? item.clue_small_area.includes(clue_small_area) : true) &&
        (industry_anzsic4_description ? item.industry_anzsic4_description.includes(industry_anzsic4_description) : true)
      );
    });
    this.setState({ filteredData });
  };

  renderData(data) {
    return (
      <ul className="list-group">
        {data.map((item, i) => (
          <li key={i} className="list-group-item">
            {item.census_year}: {item.trading_name} - {item.business_address}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    const { filteredData } = this.state;
    return (
      <div>
        <div className="filters">
          <input
            type="number"
            name="census_year"
            placeholder="Filter by Census Year"
            value={this.state.census_year}
            onChange={this.handleFilterChange}
            className="form-control"
          />
          <input
            type="text"
            name="clue_small_area"
            placeholder="Filter by Clue Small Area"
            value={this.state.clue_small_area}
            onChange={this.handleFilterChange}
            className="form-control"
          />
          <input
            type="text"
            name="industry_anzsic4_description"
            placeholder="Filter by Industry Description"
            value={this.state.industry_anzsic4_description}
            onChange={this.handleFilterChange}
            className="form-control"
          />
          <button onClick={this.applyFilters} className="btn btn-primary">Filter</button>
        </div>
        {filteredData.length > 0 ? (
          this.renderData(filteredData)
        ) : (
          <div className="alert alert-success" role="alert">
            No Data to display
          </div>
        )}
      </div>
    );
  }
}
