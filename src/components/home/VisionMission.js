/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import "./VisionMission.scss";
import abt from "../../assets/mission.jpg";

const VisionMission = () => {
  return (
    <div className="vision__section">
      <div className="vision__image">
        <img src={abt} alt="VM image" />
      </div>
      <div className="vision__text">
        <div className="header__box">
          <div className="upper_line"></div>
          <h2>Vision</h2>
          <div className="lower_line"></div>
        </div>
        <p>
          To cultivate a generation of empowered women and youth who are
          transforming agriculture into a dynamic pathway to prosperity—driven
          by innovation, entrepreneurship, and sustainable solutions.
        </p>
      </div>
    </div>
  );
};

export default VisionMission;
