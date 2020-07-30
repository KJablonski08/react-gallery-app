import React from 'react';

const Photo = (props) => {
  return (
    <li>
      {/*Using Flickr API : API Keys and proper Photo source URLs */}
      <img src={ props.url } alt=""/>
    </li>
  );
}

export default Photo;