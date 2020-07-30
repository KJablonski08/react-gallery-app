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
    rhinocerous: [],
    // displays a loading indicator each time the app fetches new data
    loading: true,
  }

  //upon app component mounted - run performSearch function to get data from api and save in state for nav buttons 
  componentDidMount() {
    this.performSearch('elephants')
    this.performSearch('lions')
    this.performSearch('leopards')
    this.performSearch('buffalo')
    this.performSearch('rhinocerous')
  }


  // Using Flickr API : API Keys and proper Photo source URLs. 
  //Data is passed down and rendered in Gallery component 
  performSearch = (query) => {
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=16&format=json&nojsoncallback=1`)
      .then(response => {
        if (query === 'elephants') {
          this.setState( { elephants: response.data.photos.photo, loading: false } )
        } else if (query === 'lions') {
          this.setState( { lions: response.data.photos.photo, loading: false} )
        } else if (query === 'leopards') {
          this.setState( { leopards: response.data.photos.photo, loading: false  } )
        } else if (query === 'buffalo') {
          this.setState( { buffalo: response.data.photos.photo, loading: false } )
        } else if (query === 'rhinocerous') {
          this.setState( { rhinocerous: response.data.photos.photo, loading: false  })
        } else {
          this.setState( { photos: response.data.photos.photo, loading: false } )
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
              <Route exact path="/" render={ () => <Redirect to="/rhinocerous" />} />
              <Route path='/elephant' render={( {match} ) => (this.state.loading) ?  <p>Loading</p> : <Gallery data={this.state.elephants} query={match.path.slice(1)} /> } />
              <Route path='/lion' render={({match}) => (this.state.loading) ?  <p>Loading</p> : <Gallery data={this.state.lions} query={match.path.slice(1)} /> } />
              <Route path='/leopard' render={({match}) => (this.state.loading) ?  <p>Loading</p> : <Gallery data={this.state.leopards} query={match.path.slice(1)} /> } />
              <Route path='/buffalo' render={({match}) => (this.state.loading) ?  <p>Loading</p> : <Gallery data={this.state.buffalo} query={match.path.slice(1)} /> } />
              <Route path='/rhinocerous' render={({match}) => (this.state.loading) ?  <p>Loading</p> : <Gallery data={this.state.rhinocerous} query={match.path.slice(1)} /> } />
              {/* displays a loading indicator each time the app fetches new data */}
              <Route path='/search/:text' render={( {match} ) => (this.state.loading) ?  <p>Loading</p> : <Gallery data={this.state.photos} performSearch={this.performSearch} query={match.params.text} />} />

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
