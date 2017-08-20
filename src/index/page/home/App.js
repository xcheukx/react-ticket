import React, { Component } from 'react';
import TopBar from './../../component/topBar';
import Config from './../../../lib/js/config';

class App extends Component {
  render() {
    return (
      <div className="App">
        <TopBar s_title={Config.websiteName} />
      </div>
    );
  }
}

export default App;
