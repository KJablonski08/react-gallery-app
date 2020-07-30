import React from 'react';
import Photo from './Photo';

class Gallery extends React.Component {
  render() {
    return (
      <div class="photo-container">
        <h2>Results</h2>
        <ul>
          <Photo />
        </ul>
      </div> 
    );
  }  
}

export default Gallery;