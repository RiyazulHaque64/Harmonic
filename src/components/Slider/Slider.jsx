import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import sliderImg1 from "../../assets/image/slider-1.jpg";
import sliderImg2 from "../../assets/image/slider-2.jpg";
import sliderImg3 from "../../assets/image/slider-3.jpg";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import { Fade } from "react-awesome-reveal";

const Slider = () => {
  return (
    <Carousel>
      <div className="relative">
        <img
          className="w-full h-[calc(100vh - 80px)]"
          src={sliderImg1}
          alt=""
        />
        <div className="absolute top-0 right-0 bottom-0 left-0 bg-black/10 flex flex-col items-center justify-center">
          <Fade duration={2000}>
            <h2 className="text-2xl md:text-5xl lg:text-7xl text-white font-bold uppercase tracking-widest">
              Music Lessons
            </h2>
          </Fade>
          <Fade duration={2000}>
            <h4 className="text-white text-lg md:text-xl lg:text-2xl font-semibold mb-4">
              Learn Music, earn certificates
            </h4>
          </Fade>
          <Fade duration={2000} className="w-1/2 mb-6 lg:mb-10 2xl:mb-12">
            <p className="text-white ">
              Learn Music, earn certificates with free online courses from
              Harvard, Stanford, MIT, University of Pennsylvania and other top
              universities around the world. Read reviews to decide if a class
              is right for you.
            </p>
          </Fade>
          <Fade duration={2000} direction="up">
            <Link to="/classes">
              <Button label="See Our Class" />
            </Link>
          </Fade>
        </div>
      </div>
      <div className="relative">
        <img
          className="w-full h-[calc(100vh - 80px)]"
          src={sliderImg2}
          alt=""
        />
        <div className="absolute top-0 right-0 bottom-0 left-0 bg-black/10 flex flex-col items-center justify-center">
          <h2 className="text-2xl md:text-5xl lg:text-7xl text-white font-bold uppercase tracking-widest">
            Music Lessons
          </h2>
          <h4 className="text-white text-lg md:text-xl lg:text-2xl font-semibold mb-4">
            Learn Music, earn certificates
          </h4>
          <p className="text-white w-1/2 mb-6 lg:mb-10 2xl:mb-12">
            Learn Music, earn certificates with free online courses from
            Harvard, Stanford, MIT, University of Pennsylvania and other top
            universities around the world. Read reviews to decide if a class is
            right for you.
          </p>
          <Link to="/classes">
            <Button label="See Our Class" />
          </Link>
        </div>
      </div>
      <div className="relative">
        <img
          className="w-full h-[calc(100vh - 80px)]"
          src={sliderImg3}
          alt=""
        />
        <div className="absolute top-0 right-0 bottom-0 left-0 bg-black/10 flex flex-col items-center justify-center">
          <Fade>
            <h2 className="text-2xl md:text-5xl lg:text-7xl text-white font-bold uppercase mb-2">
              Music Lessons
            </h2>
          </Fade>
          <h4 className="text-white text-lg md:text-xl lg:text-2xl font-semibold mb-4">
            Learn Music, earn certificates
          </h4>
          <p className="text-white w-1/2 mb-6 lg:mb-10 2xl:mb-12">
            Learn Music, earn certificates with free online courses from
            Harvard, Stanford, MIT, University of Pennsylvania and other top
            universities around the world. Read reviews to decide if a class is
            right for you.
          </p>
          <Link to="/classes">
            <Button label="See Our Class" />
          </Link>
        </div>
      </div>
    </Carousel>
  );
};

export default Slider;
