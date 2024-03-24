import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Hero1 from "../assets/images/hero/1.jpg";

const Hero = () => {
  const [slider1, setSlider1] = useState(null);
  const [slider2, setSlider2] = useState(null);

  const settings1 = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: slider2,
  };

  const settings2 = {
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: slider1,
    dots: true,
    centerMode: true,
    focusOnSelect: true,
  };

  return (
    <section className="hero">
      <div className="container">
        <h2>Slider Syncing</h2>
        <div className="slider1">
          <Slider {...settings1} ref={(slider) => setSlider1(slider)}>
            <div>
              <div className="image">
                <img src={Hero1} alt="" />
              </div>
              <div className="text">
                <h5>Destination</h5>
                <h2>Johanna Konta reaches Eastbourne Quarter Finals</h2>
              </div>
            </div>
            <div>
              <div className="image">
                <img src={Hero1} alt="" />
              </div>
              <div className="text">
                <h5>Destination</h5>
                <h2>Johanna Konta reaches Eastbourne Quarter Finals</h2>
              </div>
            </div>
            <div>
              <div className="image">
                <img src={Hero1} alt="" />
              </div>
              <div className="text">
                <h5>Destination</h5>
                <h2>Johanna Konta reaches Eastbourne Quarter Finals</h2>
              </div>
            </div>
            <div>
              <div className="image">
                <img src={Hero1} alt="" />
              </div>
              <div className="text">
                <h5>Destination</h5>
                <h2>Johanna Konta reaches Eastbourne Quarter Finals</h2>
              </div>
            </div>
          </Slider>
        </div>
        <div className="slider2">
          <Slider {...settings2} ref={(slider) => setSlider2(slider)}>
            <div>
              <div className="image">
                <img src={Hero1} alt="" />
              </div>
              <div className="text">
                <h2>Eastbourne Quarter Finals</h2>
              </div>
            </div>
            <div>
              <div className="image">
                <img src={Hero1} alt="" />
              </div>
              <div className="text">
                <h2>Eastbourne Quarter Finals</h2>
              </div>
            </div>
            <div>
              <div className="image">
                <img src={Hero1} alt="" />
              </div>
              <div className="text">
                <h2>Eastbourne Quarter Finals</h2>
              </div>
            </div>
            <div>
              <div className="image">
                <img src={Hero1} alt="" />
              </div>
              <div className="text">
                <h2>Eastbourne Quarter Finals</h2>
              </div>
            </div>
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Hero;
