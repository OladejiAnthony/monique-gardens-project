import React, { useRef, useState } from "react";
import "./Testimonial.scss";
import TestiSlide from "./TestiSlide";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
//import icon from "../../../image/african-man.png"
import aam from "../../assets/new_testimonial_armti.jpeg";
import msEl from "../../assets/testimonial_cnfa-boss.jpg";
import aaw from "../../assets/leader-3.png";
import td from "../../assets/leader-4.png";
import todd from "../../assets//leader-5.png";

const Buttons = ({ label, fontIcon, ariaButton, onEvent }) => {
  return (
    <div className="button-section">
      <button
        onClick={onEvent}
        className={label}
        aria-pressed={ariaButton}
        type="button"
      >
        {fontIcon}
        {label}
      </button>
    </div>
  );
};

const Testimonial = () => {
  const [touched, setTouched] = useState("");
  const galleryRef = useRef();
  //button hooks
  const [ariaPressed, setAriaPressed] = useState(false);
  const [faIconNext, setFaIconNext] = useState(
    <FontAwesomeIcon icon={faArrowRight} />
  );
  const [faIconPrev, setFaIconPrev] = useState(
    <FontAwesomeIcon icon={faArrowLeft} />
  );

  const onMainTouchStart = () => {
    setTouched("touched");
  };
  //scrollnext
  const scrollNext = () => {
    galleryRef.current.scrollBy({
      top: 0,
      left: 540,
      behavior: "smooth",
    });
  };
  //scrollprev
  const scrollPrev = () => {
    galleryRef.current.scrollBy({
      top: 0,
      left: -540,
      behavior: "smooth",
    });
  };
  //next click
  const onButtonNextClick = () => {
    scrollNext();
    if (ariaPressed === false) {
      setAriaPressed(true);
      setFaIconNext(<FontAwesomeIcon icon={faArrowRight} />);
      setTimeout(() => {
        setAriaPressed(false);
        setFaIconNext(<FontAwesomeIcon icon={faArrowRight} />);
      }, 600);
      console.log("button clicked");
    } else {
      setAriaPressed(false);
      setFaIconNext(<FontAwesomeIcon icon={faArrowRight} />);
    }
  };
  //prev click
  const onButtonPrevClick = () => {
    scrollPrev();
    if (ariaPressed === false) {
      setAriaPressed(true);
      setFaIconPrev(<FontAwesomeIcon icon={faArrowLeft} />);
      setTimeout(() => {
        setAriaPressed(false);
        setFaIconPrev(<FontAwesomeIcon icon={faArrowLeft} />);
      }, 600);
      console.log("button clicked");
    } else {
      setAriaPressed(false);
      setFaIconPrev(<FontAwesomeIcon icon={faArrowLeft} />);
    }
  };

  return (
    <div className="testi-carousel-wrapper">
      <main onTouchStart={onMainTouchStart} className={`carousel ${touched}`}>
        <ul aria-label="testi-gallery controls">
          <li>
            <Buttons
              ariaButton={ariaPressed}
              onEvent={onButtonPrevClick}
              fontIcon={faIconPrev}
            />
          </li>
          <li>
            <Buttons
              ariaButton={ariaPressed}
              onEvent={onButtonNextClick}
              fontIcon={faIconNext}
            />
          </li>
        </ul>
        <div
          ref={galleryRef}
          role="region"
          aria-labelledby="testi-gallery-label"
          tabIndex="0"
          aria-describedby="focus"
        >
          <ul>
            <TestiSlide
              name="Mrs Ishola"
              position="ARMTI/ Admin, ARMTI"
              src={aam}
              description="Impressive! The people at Monique Gardens and Horticultural Arena understand the Agric business. Little wonder, the founder and CEO, Dr Monica Sunnie-Ododo, is well endowed with the required professional and grassroot competence."
            />
            <TestiSlide
              name="Ms Elebthel"
              position="CNFA Director"
              src={msEl}
              description="I enjoyed my visit. I believe Monique Gardens & Horticultural Arena (MGHA) is an Agric outfit worth partnering with; they’re proactive and they deliver."
            />
            <TestiSlide
              name="Akindele Bewaji"
              position="Staff, National Museum Nigeria"
              src={aaw}
              description="We are a one stop technology and innovation agency. With years of great achievements and delivering quality products and services to our ambitious clients"
            />
            <TestiSlide
              name="Customer"
              position="Customer"
              src={todd}
              description="We are a one stop technology and innovation agency. With years of great achievements and delivering quality products and services to our ambitious clients"
            />
            <TestiSlide
              name="Oladeji Anthony"
              position="Software Engineer"
              src={td}
              description="We are a one stop technology and innovation agency. With years of great achievements and delivering quality products and services to our ambitious clients"
            />
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Testimonial;
