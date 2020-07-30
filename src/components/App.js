import React from 'react';
import SearchBar from './SearchBar'
import Nav from './Nav'
import Gallery from './Gallery'
import apiKey from '../config'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

class App extends React.Component {

  state = {
    photos: [],
    elephants: [],
    lions: [],
    leopards: []
  }

  render() {
    return (
      <div id="root">
        <BrowserRouter>
          <div className="container">
            <SearchBar />
            <Nav />
            <Switch>
              <Gallery />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
