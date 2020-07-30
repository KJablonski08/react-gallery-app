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
    leopards: [],
    buffalo: [],
    rhinocerous: []
  }

  componentDidMount() {
    this.performSearch('elephants')
    this.performSearch('lions')
    this.performSearch('leopards')
    this.performSearch('buffalo')
    this.performSearch('rhinocerous')
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
        } else if (query === 'buffalo') {
          this.setState( { buffalo: response.data.photos.photo } )
        } else if (query === 'rhinocerous') {
          this.setState( { rhinocerous: response.data.photos.photo } )
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
            <SearchBar performSearch={this.performSearch} />
            <Nav />
            <Switch>
              <Route exact path="/" render={ () => <Redirect to="/elephant" />} />
              <Route path='/elephant' render={( {match} ) => <Gallery data={this.state.elephants} query={match.path.slice(1)} /> } />
              <Route path='/lion' render={({match}) => <Gallery data={this.state.lions} query={match.path.slice(1)} /> } />
              <Route path='/leopard' render={({match}) => <Gallery data={this.state.leopards} query={match.path.slice(1)} /> } />
              <Route path='/buffalo' render={({match}) => <Gallery data={this.state.buffalo} query={match.path.slice(1)} /> } />
              <Route path='/rhinocerous' render={({match}) => <Gallery data={this.state.rhinocerous} query={match.path.slice(1)} /> } />
              <Route path='/search/:text' render={( {match} ) => <Gallery data={this.state.photos} performSearch={this.performSearch} query={match.params.text} />} />
              
              {/* 404-like error route that displays when a URL path does not match an existing route. */}
              <Route component={NotFound} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
