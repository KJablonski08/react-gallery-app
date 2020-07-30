import React from 'react';
import SearchBar from './SearchBar';
import Nav from './Nav';
import Gallery from './Gallery';
import apiKey from '../config';
import axios from 'axios';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

class App extends React.Component {

  state = {
    photos: [],
    elephants: [],
    lions: [],
    leopards: []
  }

  componentDidMount() {
    let query = 'dogs'
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=20&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState( { photos: response.data.photos.photo } )
      })
      .catch(error => {
        console.log('Error fetching data from Flickr API', error);
      });
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
