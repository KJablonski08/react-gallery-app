import React from 'react';
import Photo from './Photo';
import NotFound from './NotFound'

class Gallery extends React.Component {
  render() {

    const results = this.props.data
    let photos = results.map( pic => 
      // Using Flickr API : API Keys and proper Photo source URLs
      <Photo key={pic.id} url={ `https://farm${pic.farm}.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_n.jpg` } />
    )

    return (
      <div className="photo-container">
        <h2>Results: {this.props.query} </h2>
        <ul>
          { photos.length < 1 ? <NotFound /> : photos }
        </ul>
      </div> 
    );
  }  
}

export default Gallery;