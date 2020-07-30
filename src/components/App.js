import React from 'react';
import SearchBar from './SearchBar';
import Nav from './Nav';
import Gallery from './Gallery';
import apiKey from '../config';
import axios from 'axios';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import NotFound from './NotFound';

class App extends React.Component {

  state = {
    photos: [],
    elephants: [],
    lions: [],
    leopards: []
  }

  componentDidMount() {
    this.performSearch('elephants')
    this.performSearch('lions')
    this.performSearch('leopards')
  }

  performSearch = (query) => {
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=16&format=json&nojsoncallback=1`)
      .then(response => {
        if (query === 'elephants') {
          this.setState( { elephants: response.data.photos.photo } )
        } else if (query === 'lions') {
          this.setState( { lions: response.data.photos.photo } )
        } else if (query === 'leopards') {
          this.setState( { leopards: response.data.photos.photo } )
        } else {
          this.setState( { photos: response.data.photos.photo } )
        }
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
            <SearchBar onSearch={this.performSearch} />
            <Nav />
            <Switch>
              <Route exact path='/' render={() => <Gallery data={this.state.photos} /> } />
              <Route path='/elephant' render={() => <Gallery data={this.state.elephants} /> } />
              <Route path='/lion' render={() => <Gallery data={this.state.lions} /> } />
              <Route path='/leopard' render={() => <Gallery data={this.state.leopards} /> } />
              <Route component={NotFound} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
