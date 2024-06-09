import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import Header from './Header';
import TaskList from './TaskList';

function Home() {
  return (
    <div className="App">
      <Header />
      <div className="container">
        <TaskList />
      </div>
    </div>
  );
}

export default Home;
