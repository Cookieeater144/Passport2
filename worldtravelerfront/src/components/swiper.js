import React, { useRef, useState } from "react";

import { Swiper, SwiperSlide } from 'swiper/react';


import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./styles.css";


import { FreeMode, Navigation, Thumbs } from "swiper";

function SwiperComponent(props) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  function getimages () {
    let images = []
    if(props.photos) {
      for(let i=0; i<props.photos.length;i++) {
        images.push(<SwiperSlide>{props.photos[i]}</SwiperSlide>)
    }
    return images
  }
}
  return (
    <div>
      <Swiper
          preloadImages={false}
          lazy={true}
          navigation={true}
          spaceBetween={10}
          slidesPerView={5}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper"
      >
            { getimages() }
      </Swiper>
      </div>
    )}
  
export default SwiperComponent