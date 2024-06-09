import React from "react";
import axios from "axios";
import "./App.scss";
import Dashboard from "./components/Dashboard";
import AddData from "./components/AddData";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dashboards: [],
    };
  }

  componentDidMount() {
    axios
      .get("/api/dashboards")
      .then((response) => {
        console.log("API Response:", response.data);
        this.setState({
          dashboards: response.data.data,
        });
      })
      .catch((e) => console.log("Error fetching data:", e));
  }

  handleAddData = (data) => {
    axios
      .post("/api/dashboards", data)
      .then((response) => {
        this.setState((prevState) => ({
          dashboards: [...prevState.dashboards, response.data.data],
        }));
      })
      .catch((e) => console.log("Error adding data:", e));
  };

  render() {
    return (
      <div className="App container">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-12 col-sm-8 col-md-8 offset-md-2">
              <h1>DataBuild</h1>
              <div className="dashboards-app">
                <AddData handleAddData={this.handleAddData} />
                <Dashboard data={this.state.dashboards} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
