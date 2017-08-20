import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TopBar from './../../component/topBar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <TopBar s_title="haha" />
      </div>
    );
  }
}

export default App;
