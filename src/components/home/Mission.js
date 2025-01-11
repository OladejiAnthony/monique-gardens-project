/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import "./Mission.scss";
import abt from "../../assets/mission.jpg";

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
          At NATA, our mission is to foster a community of skilled and certified
          auto technicians who are equipped with the latest industry knowledge
          and best practices. We aim to promote excellence in auto repair
          services, ensure consumer protection, and uphold the integrity of the
          profession.
        </p>
      </div>
      <div className="mission__image">
        <img src={abt} alt="VM image" />
      </div>
    </div>
  );
};

export default Mission;
