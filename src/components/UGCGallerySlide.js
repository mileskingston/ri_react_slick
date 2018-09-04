import React, { PureComponent } from 'react';

import './UGCGallerySlide.css';

const UGCGallerySlide = (props) => { 
  const { image } = this.props;

  return (
    <a className="ugc-gallery__slides" href="#" onClick={() => { props.onClick(); }}>
      <img src={image.url} alt={image.alt} />
    </a>
  );
}

export default UGCGallerySlide;