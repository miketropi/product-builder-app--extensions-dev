import { useState, useEffect, useRef } from "react";
import Slider from "react-slick";

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
        return (_images.length > 0 ? HAS_IMAGE : NO_IMAGE)
      })(images)
    }
  </div>
}