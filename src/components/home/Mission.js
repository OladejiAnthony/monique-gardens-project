/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import "./Mission.scss";
import abt from "../../assets/train.jpg";

const Mission = () => {
  return (
    <div className="mission__section">
      <div className="mission__text">
        <div className="header__box">
          <div className="upper_line"></div>
          <h2>Mission</h2>
          <div className="lower_line"></div>
        </div>
        <p>
          We are committed to inspiring and equipping women and youth with the
          knowledge, skills, and resources to thrive in agriculture and
          agribusiness. Through training, capacity building, and awareness
          programs, we promote research-driven practices, smart use of space,
          and the integration of technology to create sustainable livelihoods
          and build the next generation of agricultural millionaires.
        </p>
      </div>
      <div className="mission__image">
        <img src={abt} alt="VM image" />
      </div>
    </div>
  );
};

export default Mission;
