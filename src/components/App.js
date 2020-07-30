import React from 'react';
import SearchBar from './SearchBar'
import Nav from './Nav'
import Gallery from './Gallery'
import apiKey from '../config'

class App extends React.Component {
  render() {
    return (
      <div id="root">
        <div className="container">
          <SearchBar />
          <Nav />
          <Gallery />
        </div>
      </div>
    );
  }
}

export default App;
