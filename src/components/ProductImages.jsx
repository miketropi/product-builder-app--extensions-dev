import { useState, useEffect, useRef } from "react";
import Slider from "react-slick";

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={ [className, '__custom-arrow'].join(' ') }
      style={{ ...style }}
      onClick={ onClick }
    >
      <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.3322 11.5644C17.3854 11.6215 17.4276 11.6894 17.4564 11.7642C17.4852 11.8389 17.5 11.9191 17.5 12C17.5 12.0809 17.4852 12.1611 17.4564 12.2358C17.4276 12.3106 17.3854 12.3785 17.3322 12.4356L10.4765 19.8195C10.3692 19.9351 10.2237 20 10.072 20C9.92031 20 9.77482 19.9351 9.66754 19.8195C9.56027 19.704 9.5 19.5473 9.5 19.3839C9.5 19.2205 9.56027 19.0638 9.66754 18.9482L16.1199 12L9.66754 5.05175C9.56027 4.93621 9.5 4.7795 9.5 4.6161C9.5 4.4527 9.56027 4.29599 9.66754 4.18045C9.77482 4.06491 9.92031 4 10.072 4C10.2237 4 10.3692 4.06491 10.4765 4.18045L17.3322 11.5644Z" fill="#222730"/>
      </svg>
    </div>
  );
}

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={ [className, '__custom-arrow'].join(' ') }
      style={{ ...style }}
      onClick={ onClick }
    >
      <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.66784 12.4356C7.61464 12.3785 7.57243 12.3106 7.54362 12.2358C7.51482 12.1611 7.5 12.0809 7.5 12C7.5 11.9191 7.51482 11.8389 7.54362 11.7642C7.57243 11.6894 7.61464 11.6215 7.66784 11.5644L14.5235 4.18045C14.6308 4.06491 14.7763 4 14.928 4C15.0797 4 15.2252 4.06491 15.3325 4.18045C15.4397 4.29599 15.5 4.4527 15.5 4.6161C15.5 4.7795 15.4397 4.93621 15.3325 5.05175L8.88015 12L15.3325 18.9482C15.4397 19.0638 15.5 19.2205 15.5 19.3839C15.5 19.5473 15.4397 19.704 15.3325 19.8195C15.2252 19.9351 15.0797 20 14.928 20C14.7763 20 14.6308 19.9351 14.5235 19.8195L7.66784 12.4356Z" fill="#222730"/>
      </svg>

    </div>
  );
}

export default function ProductImages({ images }) {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);

  useEffect(() => {
    setNav1(sliderRef1);
    setNav2(sliderRef2);
  }, []);

  const NO_IMAGE = (
    <div className="__no-image">No image</div>
  )

  const HAS_IMAGE = (
    <div className="__product-images">
      <Slider 
        asNavFor={ nav2 } 
        ref={ slider => (sliderRef1 = slider) }
        arrows={ false }
      >
        {
          images.map((_image, _i_index) => {
            const { src, id } = _image;
            return <div key={ id }>
              <img src={ src } alt="" loading="lazy" />
            </div>
          })
        }
      </Slider>
      <div className="__image-slide-nav">
        <Slider
          asNavFor={ nav1 }
          ref={ slider => (sliderRef2 = slider) }
          slidesToShow={ 3 }
          swipeToSlide={ true }
          focusOnSelect={ true }
          arrows={ true }
          nextArrow={ <NextArrow /> }
          prevArrow={ <PrevArrow /> }
        >
          {
            images.map((_image, _i_index) => {
              const { src, id } = _image;
              return <div key={ id } className="__thumb-nav-item">
                {/* <img key={ id } src={ _image.src } alt="" loading="lazy" /> */}
                <div 
                  className="__thumb" 
                  style={{ backgroundImage: `url(${ src })` }}>
                  #{ id }
                </div>
              </div>
            })
          }
        </Slider>
      </div>
    </div>
  )

  return <div className="product-builder__product-image">
    {
      ((_images) => {
        if(_images.length == 1) {
          return (
            <div className="__product-images">
              <img src={ _images[0].src } alt="#" />
            </div>
          )
        }
        return (_images.length > 0 ? HAS_IMAGE : NO_IMAGE)
      })(images)
    }
  </div>
}