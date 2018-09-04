import React, { PureComponent } from 'react';

import './UGCGallerySlide.css';

const UGCGallerySlide = (props) => (
  <a className="ugc-gallery__slides" href="#" onClick={() => { props.onClick(); }}>
    <img src={props.image.url} alt={props.image.alt} />
  </a>
);

export default UGCGallerySlide;