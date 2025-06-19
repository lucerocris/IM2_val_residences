import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface CarouselProps {
  slides: React.ReactNode[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  overlay?: React.ReactNode;
}

const Arrow = (props: any) => {
  const { className, style, onClick, direction } = props;
  return (
    <button
      className={
        `${className} z-50 absolute top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full p-2 hover:bg-black/70 focus:outline-none pointer-events-auto ` +
        (direction === 'left' ? 'left-2' : 'right-2')
      }
      style={{ ...style, display: 'block !important', zIndex: 50, pointerEvents: 'auto' }}
      onClick={onClick}
      aria-label={direction === 'left' ? 'Previous slide' : 'Next slide'}
    >
      {direction === 'left' ? '←' : '→'}
    </button>
  );
};

const Carousel: React.FC<CarouselProps> = ({ slides, autoPlay = true, autoPlayInterval = 2000, overlay }) => {
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: autoPlay,
    autoplaySpeed: autoPlayInterval,
    arrows: true,
    dots: true,
    pauseOnHover: true,
    adaptiveHeight: true,
    prevArrow: <Arrow direction="left" />,
    nextArrow: <Arrow direction="right" />,
  };

  return (
    <div className="w-full h-full mb-40 relative">
      <Slider {...settings}>
        {slides.map((slide, idx) => (
          <div key={idx} className="w-full h-full">
            {slide}
          </div>
        ))}
      </Slider>
      {overlay && (
        <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none">
          {overlay}
        </div>
      )}
    </div>
  );
};

export default Carousel;