import React, { PureComponent } from 'react';
import Slider from 'react-slick';
import mockData from '../mockData.json';
import UGCGallerySlide from './UGCGallerySlide';

import './slick-slider.css';
import './UGCGallery.css';

// helper
const MOBILE_WIDTH = 768;

class UGCGallery extends PureComponent {
  constructor() {
    super();

    this.state = { windowWidth: 0 };
    this.showUploadOverlay = this.showUploadOverlay.bind(this);
    this.showImageOverlay = this.showImageOverlay.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentDidMount() {
    this.setState({ windowWidth: window.innerWidth });
    window.addEventListener('resize', this.updateDimensions);
  };

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  };

  updateDimensions() {
    this.setState({ windowWidth: window.innerWidth });
  }

  showUploadOverlay() {
    console.log('show upload overlay');
  };

  showImageOverlay() {
    console.log('show image overlay');
  };

  render() {
    const { windowWidth } = this.state;
    const settings = {
      dots: true,
      slidesToShow: 4,
      slidesToScroll: 4,
      arrows: false,
      className: 'ugc-gallery',
      dotsClass: 'ugc-gallery__dots',
      variableWidth: true,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToScroll: 1,
            slidesToShow: 1,
            dots: false
          }
        }
      ]
    };
  
    const renderUploadSlide = () => {
      if (this.state.windowWidth > MOBILE_WIDTH) {
        return (
          <a className="ugc-gallery__slides ugc-gallery__upload-slide" href="#" onClick={() => { this.showUploadOverlay(); }}>
            <div className="ugc-gallery-upload-slide__content">
              Upload your image
              <i className="icon-ui-search">@</i>
            </div>
          </a>
        );
      }
    };

    const renderSlideshow = () => (
      <Slider {...settings}>
        {mockData.response.map((image, i) =>
          <UGCGallerySlide key={i} image={image} onClick={() => this.showImageOverlay()} />
        )}
      </Slider>
    );

    const renderStaticSlides = (device) => {
      return (
        <div className="ugc-gallery ugc-gallery--static">
          {mockData.response.map((image, i) =>
            <UGCGallerySlide key={i} image={image} onClick={() => this.showImageOverlay()} />
          )}
          {device !== 'mobile' && mockData.response.length < 4 && renderUploadSlide()}
        </div>
      );
    };

    const renderTemplate = () => {
      let gallery;
      if (windowWidth > MOBILE_WIDTH) {
        if (mockData.response.length > 4) {
          gallery = renderSlideshow('desktop');
        } else {
          gallery = renderStaticSlides('desktop');
        }
      } else {
        if (mockData.response.length > 1) {
          gallery = renderSlideshow('mobile');
        } else {
          gallery = renderStaticSlides('mobile');
        }
      }
      return gallery;
    }

    return (
      <div className="ugc-gallery__container">
        <header className="ugc-gallery__header">
          <h2>#ImWearingRI</h2>
          <button
            type="button"
            className="btn ui-tertiary ugc-gallery__btn--view"
            onClick={() => { this.showImageOverlay(); }}
          >View gallery
          </button>

          <button
            type="button"
            className="btn ui-tertiary ugc-gallery__btn--upload"
            onClick={() => { this.showUploadOverlay(); }}
          >Upload your image
          </button>
        </header>

        {renderTemplate()}
      </div>
    );
  }
}

export default UGCGallery;