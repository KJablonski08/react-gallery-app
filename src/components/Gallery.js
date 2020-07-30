import React from 'react';
import Photo from './Photo';

class Gallery extends React.Component {
  render() {

    if (this.props.performSearch) {
      this.props.performSearch(this.props.query)
    }

    const results = this.props.data
    let photos = results.map( pic => 
      <Photo url={ `https://farm${pic.farm}.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_n.jpg` } />
    )

    return (
      <div class="photo-container">
        <h2>Results</h2>
        <ul>
          { photos }
        </ul>
      </div> 
    );
  }  
}

export default Gallery;